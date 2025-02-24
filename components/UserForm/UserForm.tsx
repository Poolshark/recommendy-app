import { userStore } from "@/store/store";
import { useCallback, useState } from "react";
import { 
  TextInput, 
  View, 
  KeyboardAvoidingView, 
  Platform,
  Pressable,
  Text
} from "react-native";
import { styles } from "./styles";

/**
 * -----------------------------------------
 * USER FORM
 * -----------------------------------------
 * Displays a form for the user to enter their name.
 * The form will be displayed when the user first opens
 * the app. The form will be used to store the user's
 * name in the database and assign past recommendations
 * to the user.
 * 
 * @returns {JSX.Element} The UserForm component.
 */
export const UserForm = () => {
  const { setNewUser } = userStore();
  const [text, setText] = useState("");

  const handleInputChange = useCallback((text: string) => {
    setText(text);
  }, []);

  const handleSubmit = useCallback(() => {
    setNewUser(text);
  }, [text]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.intro}>
          Hey there!
          Please enter your name to continue.
        </Text>
        <TextInput
          value={text}
          autoCorrect={false}
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#666"
          placeholder="Enter your name"
          enablesReturnKeyAutomatically
          onChangeText={handleInputChange}
        />
        <Pressable
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};