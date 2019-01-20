import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mask: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: "#00000077"
  },
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: 0,
    overflow: "hidden"
  },
  content: {
    flex: 1
  }
});

export default styles;
