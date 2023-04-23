import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import Button from "../Button";
import AnimatedView from "../AnimatedView";

const Drawer = (props) => {
  const { setIsDrawerOpen, setIsPremiumOpen, setView } = props;

  return (
    <AnimatedView
      style={styles.container}
      animationType='speed-in-left'
      duration={200}
    >
      <View style={styles.drawer}>
        <View style={styles.logo}>
          <View style={styles.logoPlaceholder}></View>
          <Text style={styles.appName}>PhotoBud</Text>
        </View>
        <View style={styles.menu}>
          <Button label='Need help?' icon='help-circle-outline' 
            onPress={() => setView("contacts")}
          />
          <Button label='About us' icon='happy-outline' 
            onPress={() => setView("aboutus")}
          />
          <Button
            label='Premium!'
            icon='flame-outline'
            onPress={() => setIsPremiumOpen(true)}
            isFocus
          />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => setIsDrawerOpen(false)}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },

  drawer: {
    paddingRight: 30,
    backgroundColor: "#1a1a1a",
    paddingLeft: 10,
    display: "flex",
    flexDirection: "column",
    paddingTop: 30,
  },

  overlay: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flexGrow: 1,
  },

  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 10,
  },

  appName: {
    color: "white",
    fontSize: 28,
    fontWeight: 500,
  },

  logoPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: "#1464FF",
  },
});

export default Drawer;
