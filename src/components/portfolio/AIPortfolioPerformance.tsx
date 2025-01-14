import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Target, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const fetchPortfolioAnalytics = async () => {
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
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) throw error;
  return data[0];
};

export function AIPortfolioPerformance() {
  const { data: analytics, isLoading, error } = useQuery({
    queryKey: ['portfolioAnalytics'],
    queryFn: fetchPortfolioAnalytics,
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('portfolio-analytics')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property_analytics'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          toast.success("Portfolio analytics updated");
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
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-ai" />
            Loading AI Portfolio Analysis...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-muted rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Brain className="w-4 h-4" />
            Error Loading Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">Failed to load portfolio analytics. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  const marketStatus = analytics?.market_trend || 'Active';
  const roiPrediction = analytics?.predicted_growth || 15.8;
  const occupancyRate = analytics?.occupancy_rate || 96;
  const aiConfidence = analytics?.ai_confidence_score || 92;

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-ai" />
          AI Portfolio Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ROI Prediction</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="text-2xl font-bold">{roiPrediction}%</p>
              </div>
              <Badge className="bg-green-100 text-green-800 transition-all duration-200 hover:scale-105">
                High Confidence
              </Badge>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Occupancy Rate</p>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <p className="text-2xl font-bold">{occupancyRate}%</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 transition-all duration-200 hover:scale-105">
                Optimal
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">AI Confidence</p>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                <p className="text-2xl font-bold">{aiConfidence}%</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800 transition-all duration-200 hover:scale-105">
                High Accuracy
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Market Status</p>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-yellow-500" />
                <p className="text-2xl font-bold">{marketStatus}</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 transition-all duration-200 hover:scale-105">
                {marketStatus}
              </Badge>
            </div>
          </div>

          <div className="h-[300px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="month" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60}
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                />
                <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10B981" 
                  fill="url(#actualGradient)"
                  name="Actual Performance"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#6366F1" 
                  fill="url(#predictedGradient)"
                  name="AI Prediction"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">AI Insights</h4>
            <p className="text-sm text-muted-foreground">
              Portfolio performance shows strong growth with a {roiPrediction}% ROI prediction. 
              Occupancy rates remain high at {occupancyRate}%, indicating robust demand. 
              Market conditions and AI confidence levels ({aiConfidence}%) suggest continued 
              positive momentum for the next quarter.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}