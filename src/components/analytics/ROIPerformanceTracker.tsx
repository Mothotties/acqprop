import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Target, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { toast } from "sonner";
import { useEffect } from "react";

const fetchROIData = async () => {
  const { data, error } = await supabase
    .from('property_analytics')
    .select(`
      *,
      property:properties(
        title,
        price,
        location
      )
    `)
    .order('created_at', { ascending: true });

  if (error) {
    toast.error("Failed to fetch ROI data");
    throw error;
  }

  return data.map(item => ({
    date: new Date(item.created_at).toLocaleDateString(),
    actualROI: item.roi || 0,
    predictedROI: item.predicted_growth || 0,
    confidence: item.ai_confidence_score || 0,
    marketAverage: (item.roi || 0) * 0.85, // Example market comparison
  }));
};

export function ROIPerformanceTracker() {
  const { data: roiData = [], isLoading } = useQuery({
    queryKey: ['roiPerformance'],
    queryFn: fetchROIData,
  });

  // Set up real-time subscription for updates
  useEffect(() => {
    const channel = supabase
      .channel('roi-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property_analytics'
        },
        (payload) => {
          console.log('ROI update:', payload);
          toast.success("ROI data updated");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle>ROI Performance Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-muted rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  const latestROI = roiData[roiData.length - 1]?.actualROI || 0;
  const predictedROI = roiData[roiData.length - 1]?.predictedROI || 0;
  const confidenceScore = roiData[roiData.length - 1]?.confidence || 0;

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          ROI Performance Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
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
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={roiData}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60}
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  unit="%"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="actualROI"
                  stroke="#10B981"
                  fill="url(#actualGradient)"
                  name="Actual ROI"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="predictedROI"
                  stroke="#6366F1"
                  fill="url(#predictedGradient)"
                  name="Predicted ROI"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Area
                  type="monotone"
                  dataKey="marketAverage"
                  stroke="#F59E0B"
                  fill="url(#marketGradient)"
                  name="Market Average"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Performance Insights</h4>
            <p className="text-sm text-muted-foreground">
              Your portfolio's ROI is currently {latestROI > 12 ? 'outperforming' : 'performing close to'} the market average. 
              AI predictions suggest a {predictedROI > latestROI ? 'positive' : 'stable'} trend with 
              a {confidenceScore}% confidence score. Consider {latestROI < 10 ? 'diversifying your investments' : 'maintaining your current strategy'} 
              based on these metrics.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}