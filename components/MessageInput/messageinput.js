import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AnimatedView from "../AnimatedView";
import GradientView from "../GradientView";
import globalStyles from "../../styles";

const MessageInput = (props) => {
  const { onSend, setInput, input, placeholder } = props;

  return (
    <AnimatedView style={styles.messageInput} animationType="speed-in-left-right" duration={100}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={"rgba(255, 255, 255, 0.3)"}
          cursorColor={"black"}
          maxLength={250}
          onChangeText={(value) => setInput(prev => value)}
          value={input}
        />
      </View>
      <GradientView style={styles.send}>
        <TouchableOpacity onPress={onSend}>
          <Ionicons
            style={{...globalStyles.text_white, ...styles.send}}
            name='send'
            size={24}
            color='white'
          />
        </TouchableOpacity>
      </GradientView>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },

  input: {
    color: "white",
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    fontSize: 18,
    padding: 6,
    paddingLeft: 10,
    backgroundColor: "black"
  },

  messageInput: {
    flex: 1,
    borderRadius: 8,
    gap: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  send: {
    padding: 6,
    borderRadius: 10,
  }
});

export default MessageInput;
