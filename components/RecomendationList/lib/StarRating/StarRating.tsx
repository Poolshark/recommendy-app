import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { stars } from "./helpers";

import { StarRatingProps } from "./types";

/**
 * -----------------------------------------
 * STAR RATING
 * -----------------------------------------
 * Displays the star rating of a restaurant according to
 * the Google Places API rating. The component will show
 * a number of stars equal to the rating, with half stars
 * if the rating is not a whole number.
 * 
 * @param {StarRatingProps} props - The props for the StarRating component.
 * @returns {JSX.Element} The StarRating component.
 */
export const StarRating = (props: StarRatingProps) => {

  return (
    <View style={styles.container}>
      {
        stars.map((star) => {
          const diff = star - props.rating;

          if (diff < 1 && diff > 0.5) {
            return <Ionicons key={star} name="star-outline" size={24} color="gold" />
          }
          
          if (diff < 1 && diff <= 0.5 && diff > 0) {
            return <Ionicons key={star} name="star-half-outline" size={24} color="gold" />
          }

          return <Ionicons key={star} name="star" size={24} color="gold" />
        })
      }
      <Text>{props.rating}</Text>
    </View>
  );
};