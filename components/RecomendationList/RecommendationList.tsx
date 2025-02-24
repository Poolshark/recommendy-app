import { Image, Text, View } from "react-native";
import { useNavigation } from "expo-router";

import type { RecommendationRoute } from "./types";
import { styles } from "./styles";

export const RecommendationList = () => {

  const navigation = useNavigation();
  const route = navigation.getState()?.routes.find(r => r.name === 'recommendations');
  const { recommendations } = route?.params as RecommendationRoute;

  return recommendations.map((recommendation) => (
    <View key={recommendation.id} style={styles.container}>
      <Image source={{ uri: recommendation.photo_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.infoTitle}>{recommendation.restaurant_name}</Text>
        <Text>{recommendation.address}</Text>
      </View>
    </View>
  ));
};