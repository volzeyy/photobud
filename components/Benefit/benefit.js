import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Benefit = (props) => {
  const { icon, title, description } = props;

  return (
    <View style={styles.benefitContainer}>
      <Ionicons style={styles.icon} name={icon} size={48} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    benefitContainer: {
        padding: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },

    icon: {
        color: "white",
    },

    infoContainer: {
        flex: 1,
        display: "flex",
        gap: 10,
    },

    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 24,
    },

    description: {
        color: "white",
        fontSize: 16,
        lineHeight: 24,
    }
});

export default Benefit;
