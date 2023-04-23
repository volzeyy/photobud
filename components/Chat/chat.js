import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { OpenAIApi } from "openai";
import configuration from "../../constants/openai";
import MessageInput from "../MessageInput";
import Message from "../Message";
import Purchases from "react-native-purchases";

const Chat = (props) => {
  const { chat, setChat, label, placeholder, setIsPremiumOpen } = props;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  async function sendMessage() {
    try {
      console.log(1)
      const openai = new OpenAIApi(configuration);
  
      const isUserPremium = await checkPremium();
      console.log(1)
      if (!isUserPremium) {
        setIsPremiumOpen(true);
        return;
      }
      
      const content = input;
      setInput("");
      if (!content) {
        return;
      }
      
      setIsDisabled(true);
  
      let completion;
  
      const chatMessages = messages;
      setChat((prev) => {
        return {
          ...prev,
          messages: [...prev.messages, { role: "user", content: content }],
        };
      });
      const allMessages = chat.messages;
      chatMessages.push({
        role: "user",
        content: content,
      });
      allMessages.push({
        role: "user",
        content: content,
      });
  
      completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: allMessages,
        max_tokens: 300,
      });
      const answer = completion.data.choices[0].message.content;
      chatMessages.push({
        role: "assistant",
        content: answer,
      });
      allMessages.push({
        role: "assistant",
        content: answer,
      });
  
      setMessages(chatMessages);
      setChat((prev) => {
        return { ...prev, messages: allMessages };
      });
      setIsDisabled(false);
    } catch (err) {
      console.log(JSON.stringify(err))
    }
  }

  async function checkPremium() {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      return typeof customerInfo.entitlements.active["premium"] !== "undefined";
    } catch (err) {
      console.log(JSON.stringify(err));
      return undefined;
    }
  }

  return (
    <View style={styles.chat}>
      <View style={styles.chatLabel}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.messages}>
        {messages.map((message, index) => {
          return (
            <Message role={message.role} text={message.content} key={index} />
          );
        })}
      </View>
      <View style={styles.input}>
        {!isDisabled ? (
          <MessageInput
            onSend={sendMessage}
            input={input}
            setInput={setInput}
            placeholder={placeholder}
          />
        ) : (
          <Text style={styles.loading}>Loading...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "white",
    fontSize: 24,
  },

  chatLabel: {
    display: "flex",
    gap: 5,
  },

  chat: {
    display: "flex",
    flex: 1,
    padding: 20,
    paddingTop: 5,
    gap: 20,
  },

  messages: {
    flex: 1,
    gap: 20,
  },

  input: {
    gap: 5,
  },

  loading: {
    color: "white",
  },
});

export default Chat;
