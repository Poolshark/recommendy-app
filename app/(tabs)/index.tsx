import { View } from "react-native";
import { userStore } from "@/store/store";
import { UserForm } from "@/components/UserForm";
import { VoiceAssistant } from "@/components/VoiceAssistant";



export default function Index() {

  const { user } = userStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    > 
      { user === undefined ? 
          <UserForm /> 
        : <VoiceAssistant />
      }
    </View>
  );
}
