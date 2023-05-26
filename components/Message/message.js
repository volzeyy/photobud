import { View, StyleSheet, Text } from "react-native";
import AnimatedView from "../AnimatedView";
import GradientView from "../GradientView";
import globalStyles from "../../styles";

const Message = (props) => {
  const { text, role } = props;

  switch (role) {
    case "user":
      return (
        <AnimatedView style={styles.userMessage} animationType="speed-in-left-right" duration={200}>
          <Text style={{...globalStyles.text_white, lineHeight: 28.8}}>{text}</Text>
        </AnimatedView>
      );
    case "assistant":
      return (
        <AnimatedView animationType="slide-right" duration={200} >
          <GradientView
            style={styles.assistantMessage}
          >
            <Text style={{...globalStyles.text_white, lineHeight: 28.8}}>{text}</Text>
          </GradientView>
        </AnimatedView>
      );
  }
};

const styles = StyleSheet.create({
  assistantMessage: {
    padding: 6,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    gap: 10,
  },

  userMessage: {
    padding: 6,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
  },
});

export default Message;
