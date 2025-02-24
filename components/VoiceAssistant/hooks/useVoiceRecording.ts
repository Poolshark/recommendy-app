import { useState, useEffect, useCallback } from 'react';
import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';

export const useVoiceRecording = () => {
  const [error, setError] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognisedText, setRecognisedText] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => {
      setIsListening(false);
      setIsButtonPressed(false);
    };
    Voice.onSpeechError = (e: any) => {
      setError(e.error?.message || 'Speech recognition error');
      setIsListening(false);
      setIsButtonPressed(false);
    };
    Voice.onSpeechResults = (e: any) => {
      if (e.value?.[0]) setRecognisedText(e.value[0]);
    };

    return () => {
      Voice.removeAllListeners();
      Voice.destroy();
    };
  }, []);

  const startListening = useCallback(async () => {
    try {
      if (isButtonPressed) return;
      setIsButtonPressed(true);

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
      setIsButtonPressed(false);
    }
  }, [isSpeaking, isButtonPressed]);

  const stopListening = useCallback(async () => {
    try {
      if (!isButtonPressed) return;
      setIsButtonPressed(false);
      
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping voice:', error);
    }
  }, [isButtonPressed]);

  const speak = useCallback((text: string, onDone?: () => void) => {
    setIsSpeaking(true);
    Speech.speak(text, {
      language: 'en',
      onDone: () => {
        setIsSpeaking(false);
        onDone?.();
      },
      onError: () => setIsSpeaking(false),
    });
  }, []);

  return {
    error,
    isListening,
    isSpeaking,
    setRecognisedText,
    recognisedText,
    startListening,
    stopListening,
    speak,
  };
}; 