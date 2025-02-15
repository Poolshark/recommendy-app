import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';

interface Recommendation {
  name: string;
  address: string;
  rating: number;
  priceLevel?: string;
}

export default function VoiceAssistant() {
  const [recognizedText, setRecognizedText] = useState('');
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Initialize voice recognition handlers
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (e: any) => {
      if (e.value && e.value.length > 0) {
        setRecognizedText(e.value[0]);
      }
    };

    // Cleanup
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      setIsListening(true);
      setRecognizedText('');
      setRecommendation(null);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting voice:', error);
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
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setRecommendation(data);
      setIsLoading(false);

      const speechText = `I recommend ${data.name}. It has a rating of ${data.rating} stars${
        data.priceLevel ? ` and is ${data.priceLevel}` : ''
      }. You can find it at ${data.address}.`;
      
      Speech.speak(speechText, {
        language: 'en',
        pitch: 1.0,
        rate: 0.9,
      });
    } catch (err) {
      console.error('Error fetching recommendation:', err);
      setIsLoading(false);
      Speech.speak('Sorry, I encountered an error while searching for restaurants.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isListening && styles.buttonListening]}
        onPressIn={startListening}
        onPressOut={stopListening}
      >
        <Text style={styles.buttonText}>
          {isListening ? 'Listening...' : 'Hold to Speak'}
        </Text>
      </TouchableOpacity>

      {recognizedText ? (
        <Text style={styles.text}>You said: {recognizedText}</Text>
      ) : null}

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : recommendation ? (
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationTitle}>{recommendation.name}</Text>
          <Text style={styles.text}>Rating: {recommendation.rating} ⭐️</Text>
          {recommendation.priceLevel && (
            <Text style={styles.text}>Price: {recommendation.priceLevel}</Text>
          )}
          <Text style={styles.text}>{recommendation.address}</Text>
        </View>
      ) : null}
    </View>
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
}); 