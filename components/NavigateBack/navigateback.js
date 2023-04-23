import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"

const NavigateBack = (props) => {
  const { currentView, navigateTo } = props;

  return (
    <View style={styles.navigateBack}>
      <TouchableOpacity
        onPress={navigateTo}
      >
        <Ionicons name='arrow-back' size={28} color='#1464FF' />
      </TouchableOpacity>
      <View style={styles.currentView}>
        <Text style={styles.title}>{currentView}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigateBack: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    paddingTop: 18,
    gap: 10,
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: 500,
  }
});

export default NavigateBack;
