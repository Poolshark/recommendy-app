export type Recommendation = {
  id: number;
  user_id: string;
  user_name?: string;
  restaurant_name?: string;
  cuisine?: string;
  location?: string;
  guests?: number;
  dietary?: string;
  booking_time?: string;
  created_at: string;
  atmosphere?: string;
  budget?: string;
  rating?: number
  total_ratings?: number;
  price_level?: number;
  address: string;
  place_id?: string;
  photo_url?: string;
  latitude?: number;
  longitude?: number;
  website_url?: string;
  maps_url?: string;
}

export type RecommendationRoute = {
  recommendations: Recommendation[];
}