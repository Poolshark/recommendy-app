import { userStore } from "@/store/store";
import { ImageBackground } from "react-native";
import { UserForm } from "@/components/UserForm";
import { VoiceAssistant } from "@/components/VoiceAssistant";

export default function Index() {

  const { user } = userStore();

  return (
    <ImageBackground 
      source={require('../../assets/images/bg-portrait.jpg')} 
      resizeMode="cover"
      imageStyle={{ opacity: 0.8 }}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      { user === undefined ? 
          <UserForm /> 
        : <VoiceAssistant />
      }
    </ImageBackground>
  );
}
