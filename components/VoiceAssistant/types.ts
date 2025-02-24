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
};

export type SendQueryProps = {
  query: string;
  userId: string;
  userName?: string;
  isStartOfConversation?: boolean;
}


