import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export type RecommendationParams = {
  user_id: string;
  user_name: string;
  restaurant_name: string;
  cuisine: string;
  location: string;
  guests: string;
  dietary: string;
  booking_time: string;
}

export default function Recommendations() {
  const params = useLocalSearchParams<RecommendationParams>();

  return (
    <View>
      <Text>Recommendation</Text>
      <Text>{params.user_name}</Text>
      <Text>{params.restaurant_name}</Text>
      <Text>{params.cuisine}</Text>
      <Text>{params.location}</Text>
      <Text>{params.guests}</Text>
      <Text>{params.dietary}</Text>
      <Text>{params.booking_time}</Text>
    </View>
  );
}