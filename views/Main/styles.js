import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    display: "flex",
    flex: 1,
    backgroundColor: "black",
  },

  text: {
    color: "white",
    fontSize: 22,
  },

  header: {
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  main: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  actions: {
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },

  capture: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },

  action: {
    color: "white",
    padding: 5,
  },

  actionContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
});

export default styles;
