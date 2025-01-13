import { Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AIMarketInsightsProps {
  data: Array<{ local_market_trend?: string }>;
}

export function AIMarketInsights({ data }: AIMarketInsightsProps) {
  const getAIInsight = (data: Array<{ local_market_trend?: string }>) => {
    const trends = data.map(item => item.local_market_trend);
    const risingCount = trends.filter(t => t === 'Rising').length;
    const decliningCount = trends.filter(t => t === 'Declining').length;
    const stableCount = trends.filter(t => t === 'Stable').length;

    if (risingCount > decliningCount && risingCount > stableCount) {
      return "AI analysis indicates a strong upward market trend. Consider increasing investment allocation.";
    } else if (decliningCount > risingCount && decliningCount > stableCount) {
      return "Market showing signs of correction. Consider defensive positioning.";
    } else {
      return "Market conditions appear stable. Maintain current investment strategy.";
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-500" />
          AI Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {getAIInsight(data)}
        </p>
      </CardContent>
    </Card>
  );
}