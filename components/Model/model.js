import globalStyles from "../../styles";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientView from "../GradientView";

const Model = ({ chat, setView }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => setView("models")}>
      <GradientView style={styles.container}>
        <View style={styles.model}>
          <Ionicons
            style={{ ...globalStyles.text_white, fontSize: 16 }}
            name='caret-down'
          />
          <Text style={{ ...globalStyles.text_white, fontSize: 16 }}>
            {chat.model === "fast" ? "Fast model" : "Slow model"}
          </Text>
        </View>
        <View style={styles.price}>
          <Ionicons
            style={{ ...globalStyles.text_light, fontSize: 20 }}
            name='ice-cream'
          />
          <Text style={{ ...globalStyles.text_light, fontSize: 16 }}>
            {chat.model === "fast" ? "1" : "10"}
          </Text>
        </View>
      </GradientView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },

  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },

  model: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  price: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Model;
