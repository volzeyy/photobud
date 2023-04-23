import { View, StyleSheet, Text } from "react-native";
import AnimatedView from "../AnimatedView";

const Message = (props) => {
  const { text, role } = props;

  switch (role) {
    case "user":
      return (
        <AnimatedView style={styles.userMessage} animationType="speed-in-left-right" duration={200}>
          <Text style={styles.userText}>{text}</Text>
        </AnimatedView>
      );
    case "assistant":
      return (
        <AnimatedView style={styles.assistantMessage} animationType="slide-right" duration={200} >
          <Text style={styles.assistantText}>{text}</Text>
        </AnimatedView>
      );
  }
};

const styles = StyleSheet.create({
  assistantMessage: {
    padding: 10,
    backgroundColor: "#1464FF",
    borderWidth: 1,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  userMessage: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
  },

  userText: {
    fontSize: 18,
    lineHeight: 28,
    color: "white",
    flex: 1,
    textAlign: "left",
  },

  assistantText: {
    fontSize: 18,
    lineHeight: 28,
    color: "white",
    flex: 1,
    textAlign: "right",
  },
});

export default Message;
