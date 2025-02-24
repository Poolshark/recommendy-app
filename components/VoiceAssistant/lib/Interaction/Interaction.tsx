import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Text, TouchableOpacity, View } from "react-native";

import type { InteractionProps } from "./types";

/**
 * -----------------------------------------
 * INTERACTION
 * -----------------------------------------
 * Displays an interaction component for the voice
 * assistant. The component will display a button for
 * the user to start and stop the voice recording. The
 * component will also display a reset button for the
 * user to reset the conversation.
 * 
 * @param {InteractionProps} props - The props for the Interaction component.
 * @returns {JSX.Element} The Interaction component.
 */ 
export const Interaction = (props: InteractionProps) => {

  const { isListening, onPressIn, onPressOut, setIsStarted } = props;

  return (
    <View style={styles.container}>
      <Button
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        isListening={isListening}
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