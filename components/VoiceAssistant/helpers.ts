import { PermissionsAndroid, Platform } from "react-native";

import type { SetStateAction } from "react";
import type { ResetVoiceAssistantProps } from "./types";

// Request permissions on Android
export const requestPermission = async (setError: (value: SetStateAction<string>) => void) => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setError('Microphone permission denied');
      }
    } catch (err) {
      console.error(err);
      setError('Error requesting microphone permission');
    }
  }
};



export const resetVoiceAssistant = async (props: ResetVoiceAssistantProps) => {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_RECOMMENDY_API || "", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 'user-1',
        user_name: 'John Doe', 
      }),
    });

    const data = await response.json();

    props.setConversation([{ user: { id: 'user-1', text: "", name: "John Doe" }, assistant: data }]);
    props.setIsStarted(true);
    props.setIsLoading(false);

  } catch (error) {
    props.setError(`Error resetting voice assistant: ${(error as Error).message}`);
    props.setIsLoading(false);
  }
};
