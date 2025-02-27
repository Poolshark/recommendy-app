import { styles } from "./styles";
import { ActivityIndicator, Text, View } from "react-native";

/**
 * -----------------------------------------
 * LOADING
 * -----------------------------------------
 * This component displays a loading indicator and a
 * text message. It is used to indicate that the
 * voice assistant is loading.
 * 
 * @returns {JSX.Element} The Loading component.
 */ 
export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};