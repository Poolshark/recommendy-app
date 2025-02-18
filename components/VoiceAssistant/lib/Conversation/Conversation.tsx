import { styles } from "./styles";
import { View } from "react-native";
import { Message } from "./lib/Message";

import type { ConversationProps } from "./types";

export const Conversation = (props: ConversationProps) => {
  return (
    <View style={styles.container}>
      {
        props.messages.map((message) => {
          return (
            <View>
              <Message
                message={message.question}
              />
              <Message
                message={message.answer}
                isUser={true}
              />
            </View>
          );
        })
      }
    </View>
  );
};