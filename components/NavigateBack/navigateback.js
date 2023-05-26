import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import globalStyles from "../../styles";

const NavigateBack = (props) => {
  const { currentView, navigateTo } = props;

  return (
    <View style={styles.navigateBack}>
      <TouchableOpacity
        onPress={navigateTo}
      >
        <Ionicons style={globalStyles.text_heading} name='arrow-back' />
      </TouchableOpacity>
      <View style={styles.currentView}>
        <Text style={globalStyles.text_heading}>{currentView}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigateBack: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingBottom: 15,
  },
});

export default NavigateBack;
