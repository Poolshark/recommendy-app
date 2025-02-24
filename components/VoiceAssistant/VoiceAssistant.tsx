import { useState, useEffect } from 'react';
import { Container } from './lib/Containter';
import { Interaction } from './lib/Interaction';
import { Conversation } from './lib/Conversation';
import { resetVoiceAssistant, sendQuery } from './helpers';
import { userStore } from '@/store';
import { useNavigation } from 'expo-router';
import { useVoiceRecording } from './hooks/useVoiceRecording';

import type { ConversationType, Recommendation } from './types';



export const VoiceAssistant = () => {
  const navigation = useNavigation<any>(); // Temporary fix with 'any'
  const { user } = userStore();
  const { 
    error, 
    isListening, 
    recognisedText, 
    startListening, 
    stopListening, 
    speak 
  } = useVoiceRecording();
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [conversation, setConversation] = useState<ConversationType[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>();
  
  console.log("RECOGNISED TEXT", recognisedText);

  useEffect(() => {
    if (isStarted === false) {
      setIsLoading(true);
      setConversation([]);
      const userName = user || "Mr. Crumble";

      resetVoiceAssistant({ 
        userName: userName,
      }).then(res => {
        setIsLoading(false);
        if ("recommendations" in res && res.recommendations.length > 0) {
          speak(
            `Hey ${userName}, I've found some previous recommendations. Do you want to see them instead of me finding new ones?`, 
            () => setRecommendations(res.recommendations)
          );
        } else if ("error" in res) {
          speak(res.error);
        } else {
          speak(res.next_question, () => {
            setIsStarted(true);
            setRecommendations(undefined);
            setConversation([{
              user: {
                id: userName.replace(" ", "-").toLowerCase(),
                text: res.next_question,
                name: userName,
              },
              assistant: res,
            }]);
          });
        }
      });
    }
  }, [isStarted]);

  console.log("IS LISTENING", isListening);

  useEffect(() => {
    if (recognisedText !== "") {
      if (recommendations && !isStarted && recognisedText.toLowerCase().includes("yes")) {
        console.log("RECOMMENDATIONS", recommendations);
        navigation.navigate('recommendations', { recommendations: recommendations });
        return;
      }

      if (isStarted && !isListening) {
        const userObj = {
          id: user?.replace(" ", "-").toLowerCase() || "mr-crumble",
          name: user || "Mr. Crumble",
        }

        setIsLoading(true);
        sendQuery({
          userId: userObj.id,
          query: recognisedText,
        }).then(res => {
          setIsLoading(false);
          if (res.recommendation) {
            navigation.navigate('recommendations', { recommendations:[res.recommendation] });
            return;
          }
          setConversation([...conversation, { user: { id: userObj.id, text: recognisedText, name: userObj.name }, assistant: res }]);
          speak(res.next_question);
        });
      }
    }
  }, [recognisedText, recommendations, isStarted, isListening]);

  return (
    <Container error={error}>
      <Conversation messages={conversation.map(c => ({
        request: c.user.text,
        question: c.assistant.next_question,
      }))} />
      <Interaction 
        isListening={isListening}
        onPressIn={startListening}
        onPressOut={stopListening}
        setIsStarted={setIsStarted}
      />
    </Container>
  );
}