import { Text, View } from "react-native";
import { useNavigation } from "expo-router";

import type { RecommendationRoute } from "./types";

export const RecommendationList = () => {

  const navigation = useNavigation();
  const route = navigation.getState()?.routes.find(r => r.name === 'recommendations');
  const { recommendations } = route?.params as RecommendationRoute;

  return recommendations.map((recommendation) => (
    <View>
      <Text>{recommendation.restaurant_name}</Text>
    </View>
  ));
};