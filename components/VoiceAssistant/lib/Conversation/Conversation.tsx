import { styles } from "./styles";
import { ScrollView, Text, View } from "react-native";
import { Message } from "./lib/Message";

import type { ConversationProps } from "./types";

export const Conversation = (props: ConversationProps) => {
  return (
    <ScrollView style={styles.container}>
      {props.messages.length > 0 ?
        props.messages.map((message, index) => {
          return (
            <View key={index}>
              <Message
                isUser={true}
                message={message.request}
              />
              <Message
                message={message.question}
              />
            </View>
          );
        })
      :
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Press and hold the button to start the conversation.</Text>
        <Text style={styles.emptyText}>Press reset to start over.</Text>
      </View>
      }
    </ScrollView>
  );
};