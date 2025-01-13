import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Brain, Target, Activity } from "lucide-react";

const performanceData = [
  { month: "Jan 2024", actual: 100, predicted: 102, confidence: 95, occupancy: 92 },
  { month: "Feb 2024", actual: 105, predicted: 108, confidence: 94, occupancy: 94 },
  { month: "Mar 2024", actual: 115, predicted: 114, confidence: 96, occupancy: 95 },
  { month: "Apr 2024", actual: 120, predicted: 122, confidence: 93, occupancy: 93 },
  { month: "May 2024", actual: 125, predicted: 128, confidence: 95, occupancy: 96 },
  { month: "Jun 2024", actual: 135, predicted: 134, confidence: 97, occupancy: 97 },
  { month: "Jul 2024", actual: 140, predicted: 142, confidence: 96, occupancy: 98 },
  { month: "Aug 2024", actual: 145, predicted: 148, confidence: 94, occupancy: 96 },
];

export function PortfolioPerformanceMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-ai" />
          AI Portfolio Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ROI Prediction</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="text-2xl font-bold">+15.8%</p>
              </div>
              <Badge className="bg-green-100 text-green-800">High Confidence</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">AI Accuracy</p>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                <p className="text-2xl font-bold">96%</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Improving</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Portfolio Health</p>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-500" />
                <p className="text-2xl font-bold">Strong</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Optimized</Badge>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10B981" 
                  name="Actual Performance"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#6366F1" 
                  name="AI Prediction"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="occupancy" 
                  stroke="#F59E0B" 
                  name="Occupancy Rate"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">AI Insights</h4>
            <p className="text-sm text-muted-foreground">
              Portfolio performance shows strong growth with a 15.8% ROI prediction. Occupancy rates remain high at 96%, 
              indicating robust demand. Market conditions and AI confidence levels suggest continued positive momentum 
              for the next quarter.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}