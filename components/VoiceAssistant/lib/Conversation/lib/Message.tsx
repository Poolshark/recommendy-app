import { Text } from "react-native";
import { styles } from "../styles";

import type { MessageProps } from "./types";

export const Message = (props: MessageProps) => {
  return (
    <Text style={styles.container}>{props.message}</Text>
  );
};