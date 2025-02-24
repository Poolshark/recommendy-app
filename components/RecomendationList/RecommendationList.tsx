import { styles } from "./styles";
import { useNavigation } from "expo-router";
import { Image, Text, View } from "react-native";

import type { RecommendationRoute } from "./types";
import { CTA, PriceRange, StarRating } from "./lib";

/**
 * -----------------------------------------
 * RECOMMENDATION LIST
 * -----------------------------------------
 * Displays a list of recommendations for a user.
 * The component will display a list of recommendations
 * for a user, with a photo, name, address, cuisine,
 * price range, star rating, and call to action buttons.
 * 
 * The list will either contain previous recommendations, 
 * which are stored in the database, or it will contain only
 * a single recommendation, according to the user's input during
 * the conversation with the agent.
 * 
 * @returns {JSX.Element} The RecommendationList component.
 */
export const RecommendationList = () => {

  const navigation = useNavigation();
  const route = navigation.getState()?.routes.find(r => r.name === 'recommendations');
  const { recommendations } = route?.params as RecommendationRoute;

  return recommendations.map((recommendation) => (
    <View key={recommendation.id} style={styles.container}>
      <Image source={{ uri: recommendation.photo_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.infoDate}>
          {`Recommended on ${new Date(recommendation.created_at).toLocaleDateString()}`}
        </Text>
        <Text style={styles.infoTitle}>{recommendation.restaurant_name}</Text>
        <Text style={styles.infoAddress}>{recommendation.address}</Text>
        <Text>{`Cuisine: ${recommendation.cuisine}`}</Text>
        <PriceRange price={recommendation.price_level || 0} />
        <StarRating rating={recommendation.rating || 0} />
        <CTA 
          maps_url={recommendation.maps_url} 
          website_url={recommendation.website_url} 
        />
      </View>
    </View>
  ));
};