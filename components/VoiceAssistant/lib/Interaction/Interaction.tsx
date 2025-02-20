import { styles } from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/Button";

import type { InteractionProps } from "./types";

export const Interaction = (props: InteractionProps) => {

  const { isListening, onPressIn, onPressOut, setIsStarted } = props;


  return (
    <View style={styles.container}>
      <Button
        isListening={isListening}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      />
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => setIsStarted(false)}
      >
        <Text>Reset</Text>
    </TouchableOpacity>
    </View>
  );
};