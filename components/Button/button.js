import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Button = (props) => {
  const { label, icon, isFocus, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        {!isFocus ? (
          <>
            <Ionicons style={styles.icon} name={icon} size={32} />
            <Text style={styles.text}>{label}</Text>
          </>
        ) : (
          <>
            <Ionicons style={styles.iconFocus} name={icon} size={32} />
            <Text style={styles.textFocus}>{label}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 25,
    paddingLeft: 10,
    gap: 10,
  },

  text: {
    color: "white",
    fontSize: 22,
  },

  textFocus: {
    color: "#1464FF",
    fontSize: 22,
  },

  icon: {
    color: "white",
  },

  iconFocus: {
    color: "#1464FF",
  },
});

export default Button;
