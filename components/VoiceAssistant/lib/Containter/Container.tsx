import { styles } from "./styles";
import { ImageBackground, Text, View } from "react-native";

import type { ContainerProps } from "./types";

export const Container = (props: ContainerProps) => {

  if (props.error) {
    return (
      <View style={styles.error}>
        <Text>{props.error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground 
        source={require('../../../../assets/images/bg-portrait.jpg')} 
        style={styles.container}
        resizeMode="cover"
        imageStyle={{
          opacity: 0.8,
        }}
      >
        <View style={styles.wrapper}>
          {props.children}
        </View>
    </ImageBackground>
  );
};