import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoDate: {
    fontSize: 12,
  },
  infoAddress: {
    fontSize: 12,
    color: '#444',
  }
});