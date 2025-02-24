import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gridTemplateRows: '1fr',
    gridTemplateColumns: '1fr 4fr',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 20,
  }
});