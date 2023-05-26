import { StyleSheet } from "react-native";

import { Inter_400Regular, Inter_700Bold, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";

const TextFonts = () => {
    let [fontsLoaded] = useFonts({
        "Inter-Regular": Inter_400Regular,
        "Inter-Bold": Inter_700Bold,
        "Inter-SemiBold": Inter_600SemiBold,
    })
}

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 20,
  },

  text_white: {
    color: "white",
    fontFamily: "Inter-Regular",
    fontSize: 18,
  },

  text_black: {
    color: "black",
    fontFamily: "Inter-Regular",
    fontSize: 18,
  },

  text_light: {
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Inter-Regular",
    fontSize: 18,
  },

  text_dark: {
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "Inter-Regular",
    fontSize: 18,
  },

  text_heading: {
    color: "black",
    fontFamily: "Inter-Bold",
    fontSize: 28,
  },
});

export default globalStyles;