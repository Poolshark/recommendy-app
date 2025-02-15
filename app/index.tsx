import VoiceAssistant from "@/components/VoiceAssistant";
import { Text, View } from "react-native";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <VoiceAssistant />
    </View>
  );
}
