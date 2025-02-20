import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  messageContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    overflow: "hidden",
    width: "80%",
    marginTop: 5,
  },
  user: {
    marginRight: 5,
    alignSelf: "flex-end",
    backgroundColor: "#a2ef63",
  },
  assistant: {
    marginLeft: 5,
    backgroundColor: "#ededed",
  }
});