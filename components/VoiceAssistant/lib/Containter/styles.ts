import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
    width: "100%",
    gridAutoRows: "1fr",
    gridAutoColumns: "1fr",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  error: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});