import { View, StyleSheet, TextInput } from "react-native"

const AddPrompt = (props) => {
  const { placeholder, setPrompt } = props;

  return (
    <View style={styles.prompt}>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            cursorColor={"white"}
            multiline
            maxLength={250}
            onChangeText={(value) => setPrompt(prev => value)}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    prompt: {
        display: "flex",
        flexDirection: "row",
        maxWidth: "90%",
    },

    input: {
        flex: 1,
        padding: 10,
        color: "white",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 10,
        textAlign: "center"
    }
})

export default AddPrompt;