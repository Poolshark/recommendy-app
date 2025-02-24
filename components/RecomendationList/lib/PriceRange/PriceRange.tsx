import { styles } from "./styles";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { PriceRangeProps } from "./types";

/**
 * -----------------------------------------
 * PRICE RANGE
 * -----------------------------------------
 * Displays the price range of a resturant according
 * to the Google Places API price level. The component
 * will show a number of euro signs equal to the price
 * level.
 * 
 * @param {PriceRangeProps} props - The props for the PriceRange component.
 * @returns {JSX.Element} The PriceRange component.
 */
export const PriceRange = (props: PriceRangeProps) => {
  return (
    <View style={styles.container}>
      <Text>Price Range:</Text>
      <View style={styles.priceRange}>
        {
          Array.from({length: props.price}).map((_, index) => {
            return (
              <Ionicons key={index} name="logo-euro" size={16} />
            )
          })
        }
      </View>
    </View>
  );
}