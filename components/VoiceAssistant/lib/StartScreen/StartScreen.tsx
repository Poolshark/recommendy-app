import { styles } from "./styles";
import { Text, TouchableOpacity, View } from "react-native";

import type { StartScreenProps } from "./types";

export const StartScreen = (props: StartScreenProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => props.setIsStarted(false)}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};