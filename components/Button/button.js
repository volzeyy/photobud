import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import globalStyles from "../../styles";
import GradientView from "../GradientView";

const Button = (props) => {
  const { label, icon, isFocus, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {!isFocus ? (
        <View style={styles.button}>
          <Text style={styles.text}>{label}</Text>
          <Ionicons style={styles.icon} name={icon} />
        </View>
      ) : (
        <GradientView style={styles.button_focus}>
          <Text style={globalStyles.text_white}>{label}</Text>
          <Ionicons style={{...globalStyles.text_white, fontSize: 24}} name={icon} />
        </GradientView>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    gap: 10,
    borderRadius: 10,
  },

  button_focus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    gap: 10,
    borderRadius: 10,
  },

  text: {
    color: "white",
    fontSize: 22,
  },

  icon: {
    color: "white",
  },
});

export default Button;
