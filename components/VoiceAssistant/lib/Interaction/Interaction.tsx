import { styles } from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/Button";

import type { InteractionProps } from "./types";

export const Interaction = (props: InteractionProps) => {
  return (
    <View style={styles.container}>
      <Button
        onPressIn={props.onPressIn}
        onPressOut={props.onPressOut}
        isListening={props.isListening}
      />
      <TouchableOpacity
        style={styles.resetButton}
      >
        <Text>Reset</Text>
    </TouchableOpacity>
    </View>
  );
};