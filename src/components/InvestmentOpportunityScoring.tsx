import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const fetchAnalytics = async () => {
  const { data, error } = await supabase
    .from('property_analytics')
    .select(`
      *,
      property:properties(
        title,
        location,
        price
      )
    `)
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) throw error;
  return data;
};

export function InvestmentOpportunityScoring() {
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['propertyAnalytics'],
    queryFn: fetchAnalytics,
  });

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  const scoringFactors = [
    { factor: "Location", score: 85 },
    { factor: "ROI Potential", score: analyticsData?.[0]?.roi || 0 },
    { factor: "Market Growth", score: analyticsData?.[0]?.predicted_growth || 0 },
    { factor: "Risk Level", score: 100 - (analyticsData?.[0]?.risk_score || 0) * 10 },
    { factor: "AI Confidence", score: analyticsData?.[0]?.ai_confidence_score || 0 },
  ];

  const historicalScores = analyticsData?.map((item, index) => ({
    month: `Month ${index + 1}`,
    score: item.ai_confidence_score || 0,
  })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-blue-500" />
          Investment Opportunity Scoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold mb-4">Overall Score Analysis</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={scoringFactors}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="factor" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#10B981"
                    fill="#10B98133"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Score Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Overall Score</p>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              <p className="text-2xl font-bold">
                {analyticsData?.[0]?.ai_confidence_score?.toFixed(0) || 0}/100
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              {analyticsData?.[0]?.ai_confidence_score >= 90 ? 'Excellent' : 
               analyticsData?.[0]?.ai_confidence_score >= 70 ? 'Good' : 'Fair'}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">ROI Potential</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <p className="text-2xl font-bold">{analyticsData?.[0]?.roi?.toFixed(1) || 0}%</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {analyticsData?.[0]?.roi >= 15 ? 'High' : 
               analyticsData?.[0]?.roi >= 10 ? 'Medium' : 'Low'}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Risk Assessment</p>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <p className="text-2xl font-bold">
                {analyticsData?.[0]?.risk_score <= 3 ? 'Low' : 
                 analyticsData?.[0]?.risk_score <= 7 ? 'Medium' : 'High'}
              </p>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">
              {analyticsData?.[0]?.market_trend || 'Stable'}
            </Badge>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h4 className="font-semibold">AI Investment Insights</h4>
          <p className="text-sm text-muted-foreground">
            Based on our AI analysis, this investment opportunity shows 
            {analyticsData?.[0]?.ai_confidence_score >= 90 ? ' exceptional' : 
             analyticsData?.[0]?.ai_confidence_score >= 70 ? ' strong' : ' moderate'} 
            potential with an overall score of {analyticsData?.[0]?.ai_confidence_score?.toFixed(0) || 0}/100. 
            The ROI potential is particularly 
            {analyticsData?.[0]?.roi >= 15 ? ' favorable' : 
             analyticsData?.[0]?.roi >= 10 ? ' promising' : ' moderate'}, 
            while the risk level remains 
            {analyticsData?.[0]?.risk_score <= 3 ? ' well-managed' : 
             analyticsData?.[0]?.risk_score <= 7 ? ' moderate' : ' elevated'}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}