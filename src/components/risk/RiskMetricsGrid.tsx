import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Activity, Target } from "lucide-react";

interface RiskMetricsGridProps {
  riskScore: number;
  marketVolatility: number;
  confidenceScore: number;
  marketTrend: string;
}

export function RiskMetricsGrid({
  riskScore,
  marketVolatility,
  confidenceScore,
  marketTrend,
}: RiskMetricsGridProps) {
  const getRiskColor = (score: number) => {
    if (score <= 3) return "bg-green-100 text-green-800";
    if (score <= 7) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            Risk Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{riskScore}/10</div>
          <Badge className={getRiskColor(riskScore)}>
            {riskScore <= 3 ? "Low" : riskScore <= 7 ? "Medium" : "High"}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            Market Volatility
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{marketVolatility}%</div>
          <Badge className={getRiskColor(marketVolatility / 10)}>
            {marketVolatility <= 15 ? "Low" : marketVolatility <= 30 ? "Medium" : "High"}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="w-4 h-4 text-green-500" />
            AI Confidence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{confidenceScore}%</div>
          <Badge className={`bg-${confidenceScore >= 90 ? "green" : confidenceScore >= 70 ? "yellow" : "red"}-100 text-${confidenceScore >= 90 ? "green" : confidenceScore >= 70 ? "yellow" : "red"}-800`}>
            {confidenceScore >= 90 ? "High" : confidenceScore >= 70 ? "Medium" : "Low"}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            Market Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{marketTrend}</div>
          <Badge className="bg-purple-100 text-purple-800">
            Active
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}