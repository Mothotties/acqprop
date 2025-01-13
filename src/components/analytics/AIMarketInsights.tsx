import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AIMarketInsightsProps {
  data?: any[];
}

export function AIMarketInsights({ data }: AIMarketInsightsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          AI Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">AI Confidence</span>
              </div>
              <p className="text-2xl font-bold">95%</p>
              <Badge className="bg-blue-100 text-blue-800">High Confidence</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Growth Prediction</span>
              </div>
              <p className="text-2xl font-bold">+15.2%</p>
              <Badge className="bg-green-100 text-green-800">Strong Growth</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Risk Assessment</span>
              </div>
              <p className="text-2xl font-bold">Low</p>
              <Badge className="bg-purple-100 text-purple-800">Stable Market</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Market Analysis</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Current market conditions indicate strong growth potential in the residential sector.</p>
              <p>Property values are expected to appreciate by 15.2% over the next 12 months.</p>
              <p>Low interest rates and high demand continue to drive market momentum.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Investment Recommendations</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Focus on residential properties in emerging neighborhoods.</p>
              <p>Consider multi-family units for optimal ROI.</p>
              <p>Monitor commercial real estate opportunities in tech-focused areas.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}