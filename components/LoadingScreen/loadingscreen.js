import { View, Text, StyleSheet } from "react-native"

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        color: "white",
        fontSize: 32,
    }
})

export default LoadingScreen;