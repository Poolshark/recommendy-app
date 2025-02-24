import { Linking, Pressable, Text, View } from "react-native"
import { styles } from "./styles"

import { CTAProps } from "./types"

/**
 * -----------------------------------------
 * CTA
 * -----------------------------------------
 * Displays a call to action button for a restaurant.
 * The component will display two buttons, one for the
 * restaurant's website and one for the restaurant's
 * Google Maps page.
 * 
 * @param {CTAProps} props - The props for the CTA component.
 * @returns {JSX.Element} The CTA component.
 */
export const CTA = (props: CTAProps) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => {
        if (props.website_url) {
          Linking.openURL(props.website_url);
        }
      }}>
        <Text style={styles.buttonText}>Website</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => {
        if (props.maps_url) {
          Linking.openURL(props.maps_url);
        }
      }}>
        <Text style={styles.buttonText}>Maps</Text>
      </Pressable>
    </View>
  )
}