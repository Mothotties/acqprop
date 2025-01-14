import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Activity } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const marketTrendsData = [
  {
    dimension: "Price Growth",
    current: 85,
    predicted: 92,
    status: "positive",
  },
  {
    dimension: "Demand",
    current: 75,
    predicted: 82,
    status: "positive",
  },
  {
    dimension: "Supply",
    current: 60,
    predicted: 55,
    status: "negative",
  },
  {
    dimension: "Market Sentiment",
    current: 70,
    predicted: 78,
    status: "positive",
  },
  {
    dimension: "Economic Factors",
    current: 65,
    predicted: 70,
    status: "positive",
  },
];

export function MarketTrendsAnalysis() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-blue-500" />
          Market Trends Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={marketTrendsData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="dimension" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Current"
                  dataKey="current"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.5}
                />
                <Radar
                  name="Predicted"
                  dataKey="predicted"
                  stroke="#6366F1"
                  fill="#6366F1"
                  fillOpacity={0.5}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4">
              {marketTrendsData.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div>
                    <p className="font-medium">{metric.dimension}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Current: {metric.current}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={`${
                        metric.status === "positive"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      } transition-all duration-200 hover:scale-105`}
                    >
                      <TrendingUp className="w-3 h-3 mr-1 inline" />
                      {metric.predicted}%
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">Predicted</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-semibold mb-2">Analysis Summary</h4>
              <p className="text-sm text-muted-foreground">
                Market trends indicate strong growth potential with positive momentum
                across most dimensions. Supply constraints may present opportunities
                in the coming period.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}