import { useState, useEffect } from 'react';
import { StyleSheet, Platform, PermissionsAndroid, View } from 'react-native';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import { Container } from './lib/Containter';
import { Interaction } from './lib/Interaction';
import { Conversation } from './lib/Conversation';
import { requestPermission, resetVoiceAssistant } from './helpers';

import type { ConversationType } from './types';
import { StartScreen } from './lib/StartScreen/StartScreen';

interface Recommendation {
  name: string;
  address: string;
  rating: number;
  priceLevel?: string;
}

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
      resetVoiceAssistant({ setError, setIsLoading, setIsStarted, setConversation });
    }
  }, [isStarted]);

  const startListening = async () => {
    try {
      setError('');
      setIsListening(true);
      setRecognizedText('');
      setRecommendation(null);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting voice:', error);
      setError('Failed to start voice recognition');
      setIsListening(false);
    }
  };

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
      const response = await fetch(`${process.env.EXPO_RECOMMENDY_API}/conversation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'user-1',
          text: query 
        }),
      });

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
            question: c.assistant.response,
            answer: c.user.text,
          }
        })} />
        <Interaction 
          isListening={isListening}
          onPressIn={startListening}
          onPressOut={stopListening}
        />
      </View>
    }
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    padding: 20,
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonListening: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  recommendationContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
}); 