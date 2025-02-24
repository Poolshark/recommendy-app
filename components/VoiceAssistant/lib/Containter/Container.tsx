import { styles } from "./styles";
import { Text, View } from "react-native";

import type { ContainerProps } from "./types";

/**
 * -----------------------------------------
 * CONTAINER
 * -----------------------------------------
 * Displays a container for the voice assistant.
 * The container will display an error message if
 * there is an error, or the children components.
 * 
 * @param {ContainerProps} props - The props for the Container component.
 * @returns {JSX.Element} The Container component.
 */
export const Container = (props: ContainerProps) => {

  if (props.error) {
    return (
      <View style={styles.error}>
        <Text>{props.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {props.children}
    </View>
  );
};