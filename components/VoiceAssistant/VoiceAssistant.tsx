import { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import { Container } from './lib/Containter';
import { Interaction } from './lib/Interaction';
import { Conversation } from './lib/Conversation';
import { requestPermission, resetVoiceAssistant, startListening } from './helpers';

import type { ConversationType, Recommendation } from './types';
import { StartScreen } from './lib/StartScreen/StartScreen';


export const VoiceAssistant = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState<boolean | undefined>(undefined);
  const [conversation, setConversation] = useState<ConversationType[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Initialize voice recognition handlers
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechError = (e: any) => {
      setError(e.error?.message || 'Speech recognition error');
      setIsListening(false);
    };
    Voice.onSpeechResults = (e: any) => {
      if (e.value && e.value.length > 0) {
        setRecognizedText(e.value[0]);
      }
    };

    // Request microphone permission
    requestPermission(setError);

    // Cleanup
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (isStarted === false) {
      setIsLoading(true);
      resetVoiceAssistant({ 
        setError, 
        setIsLoading, 
        setIsStarted, 
        setConversation, 
        setRecommendation,
        speak: Speech.speak,
      });
    }
  }, [isStarted]);

  

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      if (recognizedText) {
        setIsLoading(true);
        sendQueryToServer(recognizedText);
      }
    } catch (error) {
      console.error('Error stopping voice:', error);
      setIsLoading(false);
    }
  };

  const sendQueryToServer = async (query: string) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_RECOMMENDY_API}/conversation`, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'user-1',
            text: query 
          })
        }
      );

      const data = await response.json();
      console.log(data);

      setConversation([...conversation, { user: { id: 'user-1', text: query, name: "John Doe" }, assistant: data }]);
      // setRecommendation(data);
      setIsLoading(false);

      const speechText = data.response;

      // const speechText = `I recommend ${data.name}. It has a rating of ${data.rating} stars${
      //   data.priceLevel ? ` and is ${data.priceLevel}` : ''
      // }. You can find it at ${data.address}.`;

      console.log("SPEECH", speechText);
      
      Speech.speak(speechText, {
        language: 'en',
      });
    } catch (err) {
      console.error('Error fetching recommendation:', err);
      setIsLoading(false);
      Speech.speak('Sorry, I encountered an error while searching for restaurants.');
    }
  };

  return (
    <Container error={error}>
      {isStarted === undefined ? <StartScreen setIsStarted={setIsStarted} /> :
      <View>
        <Conversation messages={conversation.map(c => {
          return {
            request: c.user.text,
            question: c.assistant.next_question,
          }
        })} />
        <Interaction 
          isListening={isListening}
          onPressIn={
            () => startListening({ 
              Voice, 
              setError, 
              setIsListening, 
              setRecognizedText 
            }
          )}
          onPressOut={stopListening}
        />
      </View>
    }
    </Container>
  );
}