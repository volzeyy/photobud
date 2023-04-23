import { useState, useRef, useEffect } from "react";
import { OpenAIApi } from "openai";
import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Dimensions, Text, ScrollView } from "react-native";
import { ImageEditor } from "expo-image-editor";
import Ionicons from "@expo/vector-icons/Ionicons";
import AutoHeightImage from "react-native-auto-height-image";
import { storage, db } from "../../firebase/firebase.js";
import { ref, uploadBytes } from "firebase/storage";
import { doc, onSnapshot } from "firebase/firestore";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType, FlashMode } from "expo-camera";
import Purchases from "react-native-purchases";
import { useCameraPermission } from "../../hooks/useCameraPermission.js";
import { useKeyboardStatus } from "../../hooks/useKeyboardStatus.js";
import LoadingScreen from "../../components/LoadingScreen";
import AddPrompt from "../../components/AddPrompt/addprompt.js";
import configuration from "../../constants/openai.js";
import Drawer from "../../components/Drawer/drawer.js";
import PremiumPage from "../../components/PremiumPage/premiumpage.js";

function Main(props) {
  const { setView, setChat } = props;

  const [isPremiumOpen, setIsPremiumOpen] = useState(false);

  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const hasCameraPermission = useCameraPermission();
  const keyboardStatus = useKeyboardStatus();

  const cameraRef = useRef(null);
  const snapshotRef = useRef(null);

  useEffect(() => {
    if (!extractedText) {
      setIsLoading(false);
      return;
    }

    const getAnswer = async () => {
      try {

        const openai = new OpenAIApi(configuration);
        const isUserPremium = await checkPremium();
        const model = isUserPremium ? "gpt-4" : "gpt-3.5-turbo";

        const userMessage = {
          role: "user",
          content: `${prompt || "ANSWER ONLY:"} ${extractedText}`,
        };
        const answer = await getCompletion(openai, model, [userMessage]);
        const messages = [userMessage, { role: "assistant", content: answer }];

        let explanation = "";
        if (isUserPremium) {
          const explanationMessage = {
            role: "user",
            content: `EXPLANATION ONLY:`,
          };
          explanation = await getCompletion(openai, model, [
            ...messages,
            explanationMessage,
          ]);
          messages.push(
            explanationMessage,
            { role: "assistant", content: explanation },
          );
        }

        setChat({ question: extractedText, answer, explanation, messages, image });
        setIsLoading(false);
        setView("answer");
      } catch (err) {
        console.log("Error: ", err);
        setChat({ question: "", answer: "", explanation: "", messages: [] });
        setIsLoading(false);
      }
    };

    getAnswer();
  }, [extractedText]);

  const getCompletion = async (openai, model, messages) => {
    const completion = await openai.createChatCompletion({
      model,
      messages,
      max_tokens: 500,
      top_p: 0.5,
    });
    return completion.data.choices[0].message.content;
  };

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
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
        setIsEditorVisible(true);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    setImage(result.assets[0].uri);
  }

  function deleteImage() {
    setImage("");
  }

  async function processImage() {
    const response = await fetch(image);
    const blob = await response.blob();
    return blob;
  }

  async function uploadImageToFirebase() {
    try {
      setIsLoading(true);

      const blob = await processImage();
      const filename = uuid.v4();
      const storageRef = ref(storage, filename);

      await uploadBytes(storageRef, blob);
      handleSnapshot(filename, "images");
    } catch (err) {
      console.log(err);
    }
  }

  function handleSnapshot(filename, path) {
    snapshotRef.current = onSnapshot(doc(db, path, filename), (doc) => {
      const data = doc.data();
      if (!data) return;

      setExtractedText(data.text);
      setChat((prev) => ({ ...prev, image: data.image }));
      setImage("");
    });
  }

  async function goToChat() {
    const isUserPremium = await checkPremium();
    if (!isUserPremium) {
      setIsPremiumOpen(true);
      return;
    }
    setView("chatroom");
  }

  async function checkPremium() {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      return typeof customerInfo.entitlements.active["premium"] !== "undefined";
    } catch (err) {
      console.log(JSON.stringify(err))
      return undefined;
    }
  }

  function openDrawer() {
    setIsDrawerOpen(true);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
    <View style={styles.container}>
      {!keyboardStatus.isOn && !image ? (
        <View style={styles.header}>
          <TouchableOpacity onPress={openDrawer}>
            <Ionicons style={styles.action} name='menu-outline' size={32} />
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.main}>
        {image ? (
          <ScrollView>
            <View style={styles.imageActions}>
              <View style={styles.image}>
                <AutoHeightImage
                  source={{ uri: image }}
                  width={Dimensions.get("window").width * 0.9}
                  style={styles.image}
                  onError={(err) => console.log(err)}
                />
              </View>
              <AddPrompt
                placeholder='Give it your prompt! (Optional)'
                setPrompt={setPrompt}
              />
              <View style={styles.decisionActions}>
                <TouchableOpacity onPress={deleteImage}>
                  <Ionicons style={styles.action} name='trash' size={32} />
                </TouchableOpacity>
                <TouchableOpacity onPress={uploadImageToFirebase}>
                  <Ionicons style={styles.action} name='checkmark' size={32} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : hasCameraPermission ? (
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          />
        ) :
          <Text style={styles.text}>To take photos you need to give PhotoBud Camera permissions</Text>
        }
      </View>
      {!keyboardStatus.isOn && !image ? (
        <View style={styles.actions}>
          <View>
            <TouchableOpacity onPress={takePhoto}>
              <View style={styles.captureOuter}>
                <View style={styles.capture}></View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Ionicons style={styles.action} name='image' size={32} />
            </TouchableOpacity>
            <TouchableOpacity onPress={changeFlashMode}>
              <Ionicons style={styles.action} name='flash' size={32} />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToChat}>
              <Ionicons
                style={styles.action}
                name='chatbox-ellipses'
                size={32}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <StatusBar style='auto' />
      <ImageEditor
        visible={isEditorVisible}
        onCloseEditor={() => setIsEditorVisible(false)}
        imageUri={image}
        minimumCropDimensions={{
          width: 100,
          height: 100,
        }}
        onEditingComplete={(result) => {
          setImage(result.uri);
          setChat((prev) => {
            return { ...prev, image: result.uri };
          });
        }}
        mode='crop-only'
      />
      {isPremiumOpen ?
        <PremiumPage setIsPremiumOpen={setIsPremiumOpen} />
      : isDrawerOpen ?
        <Drawer
            setIsDrawerOpen={setIsDrawerOpen}
            setIsPremiumOpen={setIsPremiumOpen}
            setView={setView}
        />
      : null}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  camera: {
    flex: 1,
  },

  text: {
    color: "white",
    fontSize: 22,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 15,
  },

  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  imageActions: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  image: {
    borderRadius: 15,
  },

  actions: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  decisionActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },

  captureOuter: {
    borderColor: "white",
    borderWidth: 5,
    padding: 2,
    borderRadius: 100,
  },

  capture: {
    backgroundColor: "#1464FF",
    width: 70,
    height: 70,
    borderRadius: 100,
  },

  photoActions: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  action: {
    color: "white",
    padding: 5,
  },

  actionContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  camera: {
    width: "100%",
    height: "100%",
  },
});

export default Main;
