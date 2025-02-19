import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 5,
    padding: 10,
    paddingTop: 60,
    display: "flex",
    minHeight: "67%",
    maxHeight: "67%",
    flexDirection: "column",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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