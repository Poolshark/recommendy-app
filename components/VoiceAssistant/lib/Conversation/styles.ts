import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 500,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  messageContainer: {
    flex: 1,
    padding: 10,
  },
  empty: {
    marginTop: "45%",
    alignSelf: "center",
  },
  emptyText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  }
});