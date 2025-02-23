import { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import { Container } from './lib/Containter';
import { Interaction } from './lib/Interaction';
import { Conversation } from './lib/Conversation';
import { requestPermission, resetVoiceAssistant, sendQuery } from './helpers';

import type { ConversationType, Recommendation } from './types';
import { StartScreen } from './lib/StartScreen/StartScreen';
import { userStore } from '@/store';


export const VoiceAssistant = () => {
  const [recognisedText, setRecognisedText] = useState('');
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState<boolean | undefined>(undefined);
  const [conversation, setConversation] = useState<ConversationType[]>([]);
  const [error, setError] = useState<string>('');
  const { user } = userStore();
  const [isSpeaking, setIsSpeaking] = useState(false);

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
        setRecognisedText(e.value[0]);
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
        userName: user || "Mr. Crumble",
      });
    }
  }, [isStarted]);

  const sendQueryToServer = useCallback(async (query: string) => {
    try {
      const userObj = {
        id: user?.replace(" ", "-").toLowerCase() || "mr-crumble",
        name: user || "Mr. Crumble",
      }

      const data = await sendQuery(query, userObj.id);

      if (data.error) {
        throw new Error(data.error);
      }

      setConversation([...conversation, { user: { id: userObj.id, text: query, name: userObj.name }, assistant: data }]);
      setIsLoading(false);
      
      setIsSpeaking(true);
      Speech.speak(data.next_question, {
        language: 'en',
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (err) {
      console.error('Error fetching recommendation:', err);
      setIsLoading(false);
      setIsSpeaking(true);
      Speech.speak('Sorry, I encountered an error while searching for restaurants.', {
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  }, [user, conversation]);

  const startListening = useCallback(async () => {
    try {
      if (isSpeaking) {
        Speech.stop();
        setIsSpeaking(false);
      }

      setError('');
      setIsListening(true);
      setRecognisedText('');
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting voice:', error);
      setError('Failed to start voice recognition');
      setIsListening(false);
    }
  }, [isSpeaking]);

  const stopListening = useCallback(async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      
      if (recognisedText) {
        setIsLoading(true);
        sendQueryToServer(recognisedText);
      }
    } catch (error) {
      console.error('Error stopping voice:', error);
      setIsLoading(false);
    }
  }, [recognisedText]);




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
          onPressIn={startListening}
          onPressOut={stopListening}
          setIsStarted={setIsStarted}
        />
      </View>
    }
    </Container>
  );
}