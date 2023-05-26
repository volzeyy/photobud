import styles from "./styles";
import { useEffect, useRef, useState } from "react";
import { View, ScrollView } from "react-native";

import { OpenAIApi } from "openai";

import getCompletion from "../../utils/getCompletion";

import configuration from "../../constants/openai";

import DisplayCard from "../../components/DisplayCard/displaycard";
import Chat from "../../components/Chat";
import NavigateBack from "../../components/NavigateBack";
import globalStyles from "../../styles";

const Explanation = ({ chat, setChat, setView }) => {
  const scrollViewRef = useRef();

  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (chat.explanation) return;

    const getExplanation = async () => {
      const openai = new OpenAIApi(configuration);
      const model = chat.model === "fast" ? "gpt-3.5-turbo" : "gpt-4";

      const messages = chat.messages;
      const explanationMessage = {
        role: "user",
        content: `EXPLANATION ONLY:`,
      };
      let explanation = await getCompletion(openai, model, [
        ...messages,
        explanationMessage,
      ]);
      messages.push(explanationMessage, {
        role: "assistant",
        content: explanation,
      });
      setChat((prev) => {
        return {
          ...prev,
          explanation,
          messages,
        };
      });
    };

    getExplanation();
  }, []);

  return (
    <View style={globalStyles.container}>
      <NavigateBack currentView='EXPLANATION' navigateTo={() => setView("answer")} />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ ...styles.main, flexGrow: 1 }}
      >
        <View style={styles.answerContainer}>
          <DisplayCard
            label='EXPLANATION'
            text={chat.explanation}
            isFocus
          />
          <DisplayCard 
            label='ANSWER' 
            text={chat.answer} 
          />
          <DisplayCard 
            label="QUESTION"
            text={chat.question}
          />
        </View>
        {chat.explanation !== "" && (
          <Chat
            chat={chat}
            setChat={setChat}
            messages={messages}
            setMessages={setMessages}
            label='Have a question?'
            placeholder='e.g. Can you do 2 + 2?'
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Explanation;
