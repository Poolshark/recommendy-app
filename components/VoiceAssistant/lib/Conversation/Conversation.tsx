import { styles } from "./styles";
import { ScrollView, Text, View } from "react-native";
import { Message } from "./lib/Message";
import { useRef, useEffect } from 'react';

import type { ConversationProps } from "./types";

export const Conversation = (props: ConversationProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (scrollViewRef.current && props.messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [props.messages]);

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messageContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 60 }}
        contentInset={{ bottom: 30 }}
        automaticallyAdjustContentInsets={false}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      >
        {props.messages.length > 0 ?
          props.messages.map((message, index) => {
            return (
              <View key={index}>
                {index !== 0 && 
                  <Message
                    isUser={true}
                    message={message.request}
                  />
                }
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
    </View>
  );
};