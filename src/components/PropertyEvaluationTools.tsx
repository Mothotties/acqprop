import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Calculator, TrendingUp, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const evaluationData = [
  { month: "Jan", actual: 850000, predicted: 855000 },
  { month: "Feb", actual: 860000, predicted: 865000 },
  { month: "Mar", actual: 870000, predicted: 875000 },
  { month: "Apr", actual: 885000, predicted: 880000 },
  { month: "May", actual: 890000, predicted: 895000 },
  { month: "Jun", actual: 900000, predicted: 905000 },
];

const metrics = [
  {
    title: "AI Confidence Score",
    value: "95%",
    trend: "+2.5%",
    icon: <Brain className="w-4 h-4 text-blue-500" />,
  },
  {
    title: "ROI Potential",
    value: "15.2%",
    trend: "+1.8%",
    icon: <TrendingUp className="w-4 h-4 text-green-500" />,
  },
  {
    title: "Market Value",
    value: "$900,000",
    trend: "+5.2%",
    icon: <DollarSign className="w-4 h-4 text-amber-500" />,
  },
  {
    title: "Cap Rate",
    value: "6.8%",
    trend: "+0.5%",
    icon: <Calculator className="w-4 h-4 text-purple-500" />,
  },
];

export function PropertyEvaluationTools() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calculator className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold">Property Evaluation Tools</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{metric.title}</p>
                {metric.icon}
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-green-600">{metric.trend}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Value Prediction Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evaluationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#10B981"
                    name="Actual Value"
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#6366F1"
                    name="Predicted Value"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={evaluationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="actual" fill="#10B981" name="Property Value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}