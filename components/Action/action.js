import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, StyleSheet } from "react-native";
import GradientView from "../GradientView";
import globalStyles from "../../styles";

const Action = ({ onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <GradientView style={styles.container}>
        <Ionicons style={{...globalStyles.text_white, fontSize: 28}} name={icon}/>
      </GradientView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 10,
  },
})

export default Action;