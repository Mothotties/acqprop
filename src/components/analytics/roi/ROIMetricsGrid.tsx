import { Brain, TrendingUp, Target, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ROIMetricsGridProps {
  latestROI: number;
  predictedROI: number;
  confidenceScore: number;
  marketStatus: string;
}

export function ROIMetricsGrid({ 
  latestROI, 
  predictedROI, 
  confidenceScore, 
  marketStatus 
}: ROIMetricsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Current ROI</p>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <p className="text-2xl font-bold">{latestROI.toFixed(1)}%</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          {latestROI >= 15 ? 'Excellent' : latestROI >= 10 ? 'Good' : 'Fair'}
        </Badge>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Predicted ROI</p>
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-blue-500" />
          <p className="text-2xl font-bold">{predictedROI.toFixed(1)}%</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">AI Forecast</Badge>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Confidence Score</p>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-500" />
          <p className="text-2xl font-bold">{confidenceScore.toFixed(0)}%</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">
          {confidenceScore >= 90 ? 'High' : confidenceScore >= 70 ? 'Medium' : 'Low'}
        </Badge>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Market Status</p>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-yellow-500" />
          <p className="text-2xl font-bold">{marketStatus}</p>
        </div>
        <Badge className="bg-yellow-100 text-yellow-800">{marketStatus}</Badge>
      </div>
    </div>
  );
}