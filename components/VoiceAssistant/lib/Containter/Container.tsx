import { styles } from "./styles";
import { ImageBackground, Text, View } from "react-native";

import type { ContainerProps } from "./types";

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