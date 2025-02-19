import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 150,
    borderRadius: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#f2a964',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  listening: {
    backgroundColor: '#1e90ff',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})