import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { MarketSentimentChart } from "./market-intelligence/MarketSentimentChart";
import { PricePredictionChart } from "./market-intelligence/PricePredictionChart";

const marketData = [
  { month: "Jan", sentiment: 85, confidence: 92, volatility: 12 },
  { month: "Feb", sentiment: 82, confidence: 90, volatility: 15 },
  { month: "Mar", sentiment: 88, confidence: 94, volatility: 11 },
  { month: "Apr", sentiment: 85, confidence: 91, volatility: 13 },
  { month: "May", sentiment: 90, confidence: 95, volatility: 10 },
  { month: "Jun", sentiment: 92, confidence: 96, volatility: 9 },
];

const predictionData = [
  { time: "1W", value: 100, predicted: 102 },
  { time: "1M", value: 105, predicted: 108 },
  { time: "3M", value: 110, predicted: 115 },
  { time: "6M", value: 115, predicted: 122 },
  { time: "1Y", value: 120, predicted: 130 },
];

export function MarketIntelligenceDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-ai" />
        <h2 className="text-2xl font-bold">Market Intelligence</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <MarketSentimentChart data={marketData} />
        <PricePredictionChart data={predictionData} />
      </div>
    </div>
  );
}