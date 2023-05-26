import styles from "./styles";
import globalStyles from "../../styles";

import { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import "react-native-url-polyfill/auto";

import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { ImageEditor } from "expo-image-editor";
import { CameraType, FlashMode } from "expo-camera";

import { useCameraPermission } from "../../hooks/useCameraPermission.js";

import {
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.js";

import CameraWrapper from "../../components/CameraWrapper";
import Action from "../../components/Action";
import Tokens from "../../components/Tokens";
import AnimatedView from "../../components/AnimatedView";
import Model from "../../components/Model";
import GradientView from "../../components/GradientView";

function Main(props) {
  const { setView, setChat, chat, user } = props;

  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [imageUri, setImageUri] = useState("");
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  const hasCameraPermission = useCameraPermission();

  const cameraRef = useRef(null);

  useEffect(() => {
    setChat(prev => ({ ...prev, question: "", answer: "", explanation: "", image: "", messages: [] }));
  }, [])

  function changeFlashMode() {
    if (flash === "off") {
      setFlash(FlashMode.torch);
      return;
    }

    if (flash === "torch") {
      setFlash(FlashMode.off);
      return;
    }

    return;
  }

  async function takePhoto() {
    const isEnoughTokens = await validatePurchase();
    if (!isEnoughTokens) {
      alert("Not enough tokens!");
      return;
    }

    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImageUri(data.uri);
        setIsEditorVisible(true);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function pickImage() {
    const isEnoughTokens = await validatePurchase();
    if (!isEnoughTokens) {
      alert("Not enought tokens!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    setImageUri(result.assets[0].uri);
  }

  async function validatePurchase() {
    const tokenCount = await checkTokens();
    const modelPrice = checkModelPrice();

    if (modelPrice > tokenCount) {
      return false;
    } else {
      return true;
    }
  }

  async function checkTokens() {
    const docRef = doc(db, "users", user.name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().tokens;
    } else {
      return 0;
    }
  }

  function checkModelPrice() {
    if (chat.model === "fast") {
      return 1;
    }

    if (chat.model === "slow") {
      return 10;
    }
  }

  return (
    <AnimatedView
      style={styles.background}
      animationType='custom'
      duration={100}
    >
      <CameraWrapper
        hasCameraPermission={hasCameraPermission}
        type={type}
        flash={flash}
        cameraRef={cameraRef}
      >
        <View style={globalStyles.container}>
          <View style={styles.header}>
            <Model chat={chat} setView={setView} />
            <Tokens onPress={() => setView("shop")} tokens={user.tokens} />
          </View>
          <View style={styles.main}>
            {!hasCameraPermission && (
              <Text style={{ ...globalStyles.text_white, textAlign: "center" }}>
                To take photos you need to give PhotoBud Camera permissions
              </Text>
            )}
          </View>
          <View style={styles.actions}>
            <View>
              <TouchableOpacity onPress={takePhoto}>
                <GradientView style={styles.capture}></GradientView>
              </TouchableOpacity>
            </View>
            <View style={styles.actionContainer}>
              <Action onPress={pickImage} icon='image' />
              <Action onPress={changeFlashMode} icon='flash' />
            </View>
          </View>
          <StatusBar style='auto' />
          <ImageEditor
            visible={isEditorVisible}
            onCloseEditor={() => setIsEditorVisible(false)}
            imageUri={imageUri}
            minimumCropDimensions={{
              width: 10,
              height: 10,
            }}
            onEditingComplete={(result) => {
              setChat((prev) => {
                return { ...prev, image: result.uri };
              });
              setView("answer");
            }}
            mode='crop-only'
          />
        </View>
      </CameraWrapper>
    </AnimatedView>
  );
}

export default Main;
