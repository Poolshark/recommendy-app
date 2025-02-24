import { Text } from "react-native";
import { styles } from "./styles";

import type { MessageProps } from "./types";

/**
 * -----------------------------------------
 * MESSAGE
 * -----------------------------------------
 * Displays a message in the conversation.
 * The message will be displayed as a user message
 * or an assistant message, depending on the value
 * of the isUser prop.
 * 
 * @param {MessageProps} props - The props for the Message component.
 * @returns {JSX.Element} The Message component.
 */
export const Message = (props: MessageProps) => {
  return (
    <Text style={
      [styles.messageContainer, props.isUser ? styles.user : styles.assistant]}
    >
      {props.message}
    </Text>
  );
};