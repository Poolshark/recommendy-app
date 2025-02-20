import { PermissionsAndroid, Platform } from "react-native";

import type { SetStateAction } from "react";
import type { ResetVoiceAssistantProps, SendQueryToServerProps, StartListeningProps, StopListeningProps } from "./types";

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
  const { userName, setConversation, setIsStarted, setIsLoading, setRecommendation, speak, setError } = props;
  try {
    const user = {
      id: userName.replace(" ", "-").toLowerCase(),
      name: userName,
    }

    const response = await fetch(process.env.EXPO_PUBLIC_RECOMMENDY_API || "", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        user_name: user.name, 
      }),
    });

    const data = await response.json();

    setConversation([{ user: { id: user.id, text: "", name: user.name }, assistant: data }]);
    setIsStarted(true);
    setIsLoading(false);
    setRecommendation(null);
    speak(data.next_question, {
      language: 'en',
    });

  } catch (error) {
    setError(`Error resetting voice assistant: ${(error as Error).message}`);
    setIsLoading(false);
  }
};

// export const startListening = async (props: StartListeningProps) => {
//   try {
//     props.setError('');
//     props.setIsListening(true);
//     props.setRecognizedText('');
//     await props.Voice.start('en-US');
//   } catch (error) {
//     console.error('Error starting voice:', error);
//     props.setError('Failed to start voice recognition');
//     props.setIsListening(false);
//   }
// };

// export const stopListening = async (props: StopListeningProps) => {
//   const { setIsListening, setIsLoading, recognisedText, stop, user, speak } = props;


//   console.log("RECOGNISED TEXT", recognisedText);

//   try {
//     await stop();
//     setIsListening(false);
//     if (recognisedText) {
//       setIsLoading(true);
//       sendQueryToServer({
//         user,
//         speak: speak,
//         query: recognisedText,
//         conversation: props.conversation,
//         setIsLoading: props.setIsLoading,
//         setConversation: props.setConversation,
//       });
//     }
//   } catch (error) {
//     console.error('Error stopping voice:', error);
//     setIsLoading(false);
//   }
// };

// export const sendQueryToServer = async (props: SendQueryToServerProps) => {
//   const { user, query, speak, setIsLoading, conversation, setConversation } = props;
//   try {
//     const response = await fetch(
//       `${process.env.EXPO_PUBLIC_RECOMMENDY_API}/conversation`, 
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           user_id: 'user-1',
//           text: query 
//         })
//       }
//     );

//     const data = await response.json();

//     setConversation([...conversation, { user: { id: user.id, text: query, name: user.name }, assistant: data }]);
//     // setRecommendation(data);
//     setIsLoading(false);

//     const speechText = data.response;

//     // const speechText = `I recommend ${data.name}. It has a rating of ${data.rating} stars${
//     //   data.priceLevel ? ` and is ${data.priceLevel}` : ''
//     // }. You can find it at ${data.address}.`;

//     console.log("SPEECH", speechText);
    
//     speak(speechText, {
//       language: 'en',
//     });
//   } catch (err) {
//     console.error('Error fetching recommendation:', err);
//     setIsLoading(false);
//     speak('Sorry, I encountered an error while searching for restaurants.');
//   }
// };

export const sendQuery = async (query: string, userId: string) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_RECOMMENDY_API}/conversation`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          text: query 
        })
      }
    );

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('An error occurred while sending the query:', error);
    return {
      error: 'Sorry, I encountered an error while searching for restaurants.'
    };
  }
}
