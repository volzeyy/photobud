import globalStyles from "../../styles";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { OpenAIApi } from "openai";
import configuration from "../../constants/openai";
import MessageInput from "../MessageInput";
import Message from "../Message";
import GradientView from "../GradientView";

const Chat = (props) => {
  const { chat, setChat, label, placeholder, messages, setMessages } = props;
  
  const [input, setInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  async function sendMessage() {
    try {
      console.log(1)
      const openai = new OpenAIApi(configuration);

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
        max_tokens: 2000,
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
      console.log("Error: ", err)
    }
  }

  return (
    <View style={styles.chat}>
      <View style={styles.chatLabel}>
        <Text style={{...globalStyles.text_heading, fontSize: 24}}>{label}</Text>
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
          <GradientView style={styles.loading}>
            <Text style={globalStyles.text_light}>Loading...</Text>
          </GradientView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chat: {
    display: "flex",
    gap: 10,
    paddingBottom: 15,
  },

  chatLabel: {
    display: "flex",
    gap: 5,
  },

  messages: {
    display: "flex",
    gap: 15,
  },

  input: {
    gap: 5,
    paddingTop: 5
  },

  loading: {
    padding: 10,
    borderRadius: 10,
  },
});

export default Chat;
