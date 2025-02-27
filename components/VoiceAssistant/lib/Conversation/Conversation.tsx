import { styles } from "./styles";
import { Message } from "./lib/Message";
import { useRef, useEffect } from 'react';
import { ScrollView, Text, View } from "react-native";

import type { ConversationProps } from "./types";

/**
 * -----------------------------------------
 * CONVERSATION
 * -----------------------------------------
 * Displays a conversation between the user and the assistant.
 * The conversation will display the user's messages and the
 * assistant's messages.
 * 
 * @param {ConversationProps} props - The props for the Conversation component.
 * @returns {JSX.Element} The Conversation component.
 */ 
export const Conversation = (props: ConversationProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  // Handles the scrolling behaviour of the conversation
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
        contentInset={{ bottom: 30 }}
        style={styles.messageContainer}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{ paddingTop: 60 }}
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