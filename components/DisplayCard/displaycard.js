import globalStyles from "../../styles";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientView from "../GradientView";

const DisplayCard = (props) => {
  const { text, label, icon, isFocus } = props;

  if (isFocus) {
    return (
      <GradientView
        style={styles.card}
      >
        <View style={styles.info}>
          <View style={styles.labelContainer}>
            <Text style={{...globalStyles.text_light, fontSize: 12}}>{label}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={{...globalStyles.text_white, lineHeight: 28.8}}>{text || "Loading..."}</Text>
          </View>
        </View>
      </GradientView>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <View style={styles.labelContainer}>
          <Text style={{...globalStyles.text_dark, fontSize: 12}}>{label}</Text>
          {icon && <Ionicons style={{...globalStyles.text_dark, fontSize: 24}} name={icon} />}
        </View>
        <View style={styles.textContainer}>
          <Text style={{...globalStyles.text_black, lineHeight: 28.8}}>{text || "Loading..."}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    gap: 30,
    borderRadius: 10,
  },

  info: {
    gap: 5,
    padding: 10,
  },

  textContainer: {
    display: "flex",
  },

  labelContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  label: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 14,
  },

  text: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 28,
    flex: 1,
  },

  image: {
    borderRadius: 10,
  },
});

export default DisplayCard;
