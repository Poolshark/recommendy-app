import { ScrollView, Text } from "react-native";
import { RecommendationList } from "@/components/RecomendationList";

export default function Recommendations() {
  return (
    <ScrollView 
      contentInset={{ bottom: 60 }}
      showsHorizontalScrollIndicator={false} 
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={{ padding: 16, marginTop: 60, gap: 10 }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Recommendations
      </Text>
      <RecommendationList />
    </ScrollView>
  );
}