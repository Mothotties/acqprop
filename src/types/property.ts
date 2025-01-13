export interface PropertyAnalytics {
  ai_confidence_score: number | null;
  cap_rate: number | null;
  roi: number | null;
  predicted_growth: number | null;
  market_volatility: number | null;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  property_type: string;
  coordinates?: { x: number; y: number };
  property_analytics?: PropertyAnalytics[];
}