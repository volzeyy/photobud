import styles from "./styles";
import { useRef, useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import "react-native-url-polyfill/auto";

import DisplayCard from "../../components/DisplayCard/displaycard";
import NavigateBack from "../../components/NavigateBack";
import Button from "../../components/Button";
import globalStyles from "../../styles";

import { onSnapshot, doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import { OpenAIApi } from "openai";
import configuration from "../../constants/openai.js";

import uploadToFirebase from "../../utils/uploadToFirebase";
import getCompletion from "../../utils/getCompletion";

function Answer({ chat, setChat, setView, user, setUser }) {
  const scrollViewRef = useRef();
  const snapshotRef = useRef(null);

  const [extractedText, setExtractedText] = useState("");

  useEffect(() => {
    if (!extractedText) {
      return;
    }

    const getAnswer = async () => {
      try {
        snapshotRef.current();
        const openai = new OpenAIApi(configuration);
        const model = chat.model === "fast" ? "gpt-3.5-turbo" : "gpt-4";

        const userMessage = {
          role: "user",
          content: `ANSWER ONLY, NO EXPLANATION: ${extractedText}`,
        };
        const answer = await getCompletion(openai, model, [userMessage]);
        const messages = [userMessage, { role: "assistant", content: answer }];

        setChat(prev => ({
          ...prev,
          question: extractedText,
          explanation: "",
          answer,
          messages,
        }));

        const modelPrice = checkModelPrice();
        const tokensAfterPurchase = user.tokens - modelPrice;
        const usersRef = collection(db, "users");
        await setDoc(doc(usersRef, user.name), {
          ...user,
          tokens: tokensAfterPurchase,
        });
        setUser((prev) => ({
          ...prev,
          tokens: tokensAfterPurchase,
        }));
      } catch (err) {
        console.log(JSON.stringify(err));
        setChat({ question: "", answer: "", explanation: "", messages: [] });
      }
    };

    getAnswer();
  }, [extractedText]);

  useEffect(() => {
    if (!chat.image) return;

    async function extractText() {
      const filename = await uploadToFirebase(chat.image);
      handleSnapshot(filename, "images");
    }

    extractText();

    return () => {
      console.log("ImageExtractor unmounted!");
    };
  }, [chat.image]);

  function handleSnapshot(filename, path) {
    snapshotRef.current = onSnapshot(doc(db, path, filename), (doc) => {
      const data = doc.data();
      if (!data) return;

      setExtractedText(data.text);
      setChat((prev) => ({ ...prev, image: "", question: data.text }));
    });
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
    <>
      <View style={globalStyles.container}>
        <NavigateBack currentView='ANSWER' navigateTo={() => setView("main")} />
        <View style={{ ...styles.main }}>
          <ScrollView
            style={{ ...styles.answerContainer, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
            ref={scrollViewRef}
          >
            <DisplayCard label='ANSWER' text={chat.answer} isFocus />
            <DisplayCard
              label='QUESTION'
              icon='create-outline'
              text={chat.question}
            />
          </ScrollView>
          <Button
            label='Explanation'
            icon='arrow-forward-outline'
            onPress={() => setView("explanation")}
            isFocus
          />
        </View>
      </View>
    </>
  );
}

export default Answer;
