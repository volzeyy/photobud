import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientView from "../GradientView";
import globalStyles from "../../styles";

const Tokens = ({ onPress, tokens }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <GradientView style={styles.container}>
        <Ionicons style={{...globalStyles.text_white, fontSize: 20}} name='ice-cream' />
        <Text style={{...globalStyles.text_white, fontSize: 16}}>{tokens ? tokens : "Loading..."}</Text>
        <Ionicons style={{...globalStyles.text_white, fontSize: 20}} name='add-circle-outline' />
      </GradientView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    gap: 6,
    borderRadius: 10,
  },
});

export default Tokens;
