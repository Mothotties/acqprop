import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Activity } from "lucide-react";

interface RiskFactor {
  name: string;
  impact: "High" | "Medium" | "Low";
  trend: "Increasing" | "Stable" | "Decreasing";
  description: string;
}

interface RiskFactorsAnalysisProps {
  factors: RiskFactor[];
}

export function RiskFactorsAnalysis({ factors }: RiskFactorsAnalysisProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "Increasing":
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case "Decreasing":
        return <TrendingUp className="w-4 h-4 text-green-500 transform rotate-180" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Risk Factors Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {factors.map((factor, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">{factor.name}</p>
                <p className="text-sm text-muted-foreground">{factor.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={getImpactColor(factor.impact)}>
                  {factor.impact} Impact
                </Badge>
                <div className="flex items-center gap-1">
                  {getTrendIcon(factor.trend)}
                  <span className="text-sm font-medium">{factor.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}