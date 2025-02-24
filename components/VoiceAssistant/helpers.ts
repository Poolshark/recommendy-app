import type { ResetVoiceAssistantProps, SendQueryProps } from "./types";

/**
 * -----------------------------------------
 * RESET VOICE ASSISTANT
 * -----------------------------------------
 * Resets the voice assistant.
 * 
 * @param {ResetVoiceAssistantProps} props - The props for the resetVoiceAssistant function.
 * @returns {Promise<any>} A promise that resolves to the response from the server.
 */
export const resetVoiceAssistant = async (props: ResetVoiceAssistantProps) => {
  const { userName } = props;

  const response = await sendQuery({
    query: "",
    userName: userName,
    isStartOfConversation: true,
    userId: userName.replace(" ", "-").toLowerCase(),
  });

  return response;
};

/**
 * -----------------------------------------
 * SEND QUERY
 * -----------------------------------------
 * Sends a query to the server.
 * 
 * @param {SendQueryProps} props - The props for the sendQuery function.
 * @returns {Promise<any>} A promise that resolves to the response from the server.
 */
export const sendQuery = async (props: SendQueryProps) => {
  const { query, userId, userName, isStartOfConversation } = props;

  try {
    const endpoint = isStartOfConversation ? "/" : "/conversation";
    const body = {
      text: query,
      user_id: userId,
      user_name: userName,
    }

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_RECOMMENDY_API}${endpoint}`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
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
