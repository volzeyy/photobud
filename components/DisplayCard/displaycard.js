import { View, Text, StyleSheet, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AutoHeightImage from "react-native-auto-height-image";

const DisplayCard = (props) => {
  const { text, label, icon, image } = props;

  return (
    <View style={styles.card}>
      {image && (
        <View>
          <AutoHeightImage
            source={{ uri: image }}
            width={Dimensions.get("window").width * 0.9}
            style={styles.image}
            onError={(err) => console.log(err)}
          />
        </View>
      )}
      <View style={styles.info}>
        <View style={styles.labelContainer}>
            <Ionicons name={icon} size={24} color='rgba(255, 255, 255, 0.5)' />
            <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    gap: 30,
  },

  textContainer: {
    display: "flex",
  },

  labelContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  info: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    gap: 5,
    borderRadius: 10,
    padding: 10,
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
