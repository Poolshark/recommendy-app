import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./styles"

import type { ButtonProps } from "./types"

export const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
        style={[styles.button, props.isListening && styles.listening]}
        onPressIn={props.onPressIn}
        onPressOut={props.onPressOut}
      >
        {props.isListening ?  
          <Ionicons name="recording" size={36} color="white" /> : 
          <Ionicons name="mic" size={36} color="white" />
        }
    </TouchableOpacity>
  )
}