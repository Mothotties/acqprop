export interface PropertyAnalytics {
  ai_confidence_score: number | null;
  cap_rate: number | null;
  roi: number | null;
  predicted_growth: number | null;
  market_volatility: number | null;
  occupancy_rate: number | null;
}

export interface PropertyMarketData {
  market_value: number | null;
  price_per_sqft: number | null;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  property_type: string;
  coordinates?: { x: number; y: number } | null;
  property_analytics?: PropertyAnalytics[];
  property_market_data?: PropertyMarketData[];
  square_feet?: number;
  year_built?: number;
}