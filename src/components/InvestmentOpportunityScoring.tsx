import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";
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

const scoringFactors = [
  { factor: "Location", score: 85 },
  { factor: "ROI Potential", score: 92 },
  { factor: "Market Growth", score: 78 },
  { factor: "Property Condition", score: 88 },
  { factor: "Risk Level", score: 75 },
];

const historicalScores = [
  { month: "Jan", score: 82 },
  { month: "Feb", score: 85 },
  { month: "Mar", score: 88 },
  { month: "Apr", score: 86 },
  { month: "May", score: 90 },
  { month: "Jun", score: 92 },
];

export function InvestmentOpportunityScoring() {
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
              <p className="text-2xl font-bold">92/100</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Excellent</Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">ROI Potential</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <p className="text-2xl font-bold">15.2%</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">High</Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Risk Assessment</p>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <p className="text-2xl font-bold">Low</p>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">Stable</Badge>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h4 className="font-semibold">AI Investment Insights</h4>
          <p className="text-sm text-muted-foreground">
            Based on our AI analysis, this investment opportunity shows strong potential with a high overall score of 92/100. 
            The location and ROI potential are particularly favorable, while the risk level remains manageable. 
            Historical trend shows consistent improvement in scoring metrics.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}