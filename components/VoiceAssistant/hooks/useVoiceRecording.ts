import * as Speech from 'expo-speech';
import { useState, useEffect, useCallback } from 'react';
import Voice from '@react-native-voice/voice';

/**
 * -----------------------------------------
 * VOICE RECORDING HOOK
 * -----------------------------------------
 * Handles the voice recording functionality.
 * The hook will start the voice recording, stop
 * the voice recording, and speak the recognised
 * text.
 * 
 * @returns {Object} An object containing the error,
 * isListening, isSpeaking, recognisedText, and
 * startListening and stopListening functions.
 */
export const useVoiceRecording = () => {
  const [error, setError] = useState<string>('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognisedText, setRecognisedText] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  // Set up the voice recording listeners
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

  // Start the voice recording (when the button is pressed)
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
      await Voice.start('en-GB');
    } catch (error) {
      console.error('Error starting voice:', error);
      setError('Failed to start voice recognition');
      setIsListening(false);
      setIsButtonPressed(false);
    }
  }, [isSpeaking, isButtonPressed]);

  // Stop the voice recording (when the button is released)
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

  // Speak the recognised text
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
    speak,
    isSpeaking,
    isListening,
    stopListening,
    recognisedText,
    startListening,
    setRecognisedText,
  };
}; 