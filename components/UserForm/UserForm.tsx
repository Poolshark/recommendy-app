import { userStore } from "@/store/store";
import { useState } from "react";
import { 
  Button, 
  TextInput, 
  View, 
  KeyboardAvoidingView, 
  Platform,
  StyleSheet 
} from "react-native";

export const UserForm = () => {
  const { user, setNewUser } = userStore();
  const [text, setText] = useState("");

  const handleInputChange = (text: string) => {
    setText(text);
  }

  const handleSubmit = () => {
    setNewUser(text);
  }

  console.log("IN USER FORM", user);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          value={text}
          placeholder="Enter your name"
          placeholderTextColor="#666"
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically
        />
        <Button
          title="Submit"
          onPress={handleSubmit}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 20,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  }
});