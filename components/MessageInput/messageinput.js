import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AnimatedView from "../AnimatedView";

const MessageInput = (props) => {
  const { onSend, setInput, input, placeholder } = props;

  return (
    <AnimatedView style={styles.messageInput} animationType="speed-in-left-right" duration={100}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          cursorColor={"white"}
          multiline
          maxLength={250}
          onChangeText={(value) => setInput(prev => value)}
          value={input}
        />
      </View>
      <View>
        <TouchableOpacity onPress={onSend}>
          <Ionicons
            style={styles.send}
            name='send'
            size={28}
            color='#1464FF'
          />
        </TouchableOpacity>
      </View>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },

  input: {
    color: "white",
    flex: 1,
    fontSize: 18,
    lineHeight: 28,
  },

  messageInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    gap: 15,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MessageInput;
