import type { speak } from 'expo-speech';
import type Voice from '@react-native-voice/voice';
import type { Dispatch, SetStateAction } from "react";

export type Recommendation = {
  name: string;
  address: string;
  rating: number;
  priceLevel?: string;
}

export type ConversationType = {
  user: {
    id: string;
    name: string;
    text: string;
  }
  assistant: {
    response: string;
    next_question: string;
    next_state: string;
    sentiment: string;
    current_conversation: string[];
    user_id: string;
    user_info: string[]
    user_name: string;
    current_step: string;
  }
}

export type ResetVoiceAssistantProps = {
  userName: string;
  speak: typeof speak;
  setError: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsStarted: Dispatch<SetStateAction<boolean | undefined>>;
  setConversation: Dispatch<SetStateAction<ConversationType[]>>;
  setRecommendation: Dispatch<SetStateAction<Recommendation | null>>;
};

export type StartListeningProps = {
  Voice: typeof Voice;
  setError: Dispatch<SetStateAction<string>>;
  setIsListening: Dispatch<SetStateAction<boolean>>;
  setRecognizedText: Dispatch<SetStateAction<string>>
};


export interface SendQueryToServerProps {
  user: {
    id: string;
    name: string;
  }
  query: string;
  speak: typeof speak;
  conversation: ConversationType[];
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setConversation: Dispatch<SetStateAction<ConversationType[]>>;
};

export interface StopListeningProps extends SendQueryToServerProps {
  stop: typeof Voice.stop;
  recognisedText: string;
  setIsListening: Dispatch<SetStateAction<boolean>>;
};


