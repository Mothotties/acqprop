import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, DollarSign, Building2, Activity } from "lucide-react";
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

const performanceData = [
  { month: "Jan", revenue: 45000, occupancy: 95 },
  { month: "Feb", revenue: 52000, occupancy: 92 },
  { month: "Mar", revenue: 48000, occupancy: 94 },
  { month: "Apr", revenue: 61000, occupancy: 96 },
  { month: "May", revenue: 55000, occupancy: 93 },
  { month: "Jun", revenue: 67000, occupancy: 97 },
];

const propertyMetrics = [
  {
    title: "Total Revenue",
    value: "$328,000",
    trend: "+12.5%",
    icon: <DollarSign className="w-4 h-4 text-green-500" />,
    positive: true,
  },
  {
    title: "Occupancy Rate",
    value: "94.5%",
    trend: "+2.3%",
    icon: <Building2 className="w-4 h-4 text-blue-500" />,
    positive: true,
  },
  {
    title: "ROI",
    value: "15.2%",
    trend: "+3.1%",
    icon: <TrendingUp className="w-4 h-4 text-indigo-500" />,
    positive: true,
  },
  {
    title: "Market Growth",
    value: "8.7%",
    trend: "-1.2%",
    icon: <Activity className="w-4 h-4 text-yellow-500" />,
    positive: false,
  },
];

export function PropertyAnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Property Analytics</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {propertyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2">
                <p
                  className={`text-xs ${
                    metric.positive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {metric.trend}
                </p>
                <Badge
                  variant="secondary"
                  className={`${
                    metric.positive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {metric.positive ? "Increase" : "Decrease"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#6366F1"
                    name="Occupancy Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}