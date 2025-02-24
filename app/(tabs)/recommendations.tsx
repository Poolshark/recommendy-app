import { ScrollView, Text } from "react-native";
import { RecommendationList } from "@/components/RecomendationList";

export default function Recommendations() {
  return (
    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 16, marginTop: 60 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Recommendations
      </Text>
      <RecommendationList />
    </ScrollView>
  );
}