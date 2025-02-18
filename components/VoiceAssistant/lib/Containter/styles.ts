import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: 5,
    gridAutoRows: "1fr",
    gridAutoColumns: "1fr",
  },
  error: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});