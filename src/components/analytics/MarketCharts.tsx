import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Building2, TrendingUp, Users, AlertTriangle } from "lucide-react";

interface MarketChartsProps {
  data?: Array<{
    property: string;
    marketValue: number;
    pricePerSqft: number;
  }>;
}

// Sample data for different charts
const propertyValueData = [
  { month: "Jan", currentValue: 850000, predictedValue: 855000, marketAverage: 840000 },
  { month: "Feb", currentValue: 860000, predictedValue: 870000, marketAverage: 845000 },
  { month: "Mar", currentValue: 870000, predictedValue: 885000, marketAverage: 855000 },
  { month: "Apr", currentValue: 885000, predictedValue: 900000, marketAverage: 870000 },
  { month: "May", currentValue: 890000, predictedValue: 915000, marketAverage: 880000 },
  { month: "Jun", currentValue: 900000, predictedValue: 925000, marketAverage: 895000 },
];

const roiTrendsData = [
  { month: "Jan", roi: 7.2, marketValue: 850000 },
  { month: "Feb", roi: 7.5, marketValue: 860000 },
  { month: "Mar", roi: 7.8, marketValue: 870000 },
  { month: "Apr", roi: 8.1, marketValue: 885000 },
  { month: "May", roi: 8.4, marketValue: 890000 },
  { month: "Jun", roi: 8.7, marketValue: 900000 },
];

const occupancyData = [
  { month: "Jan", occupancy: 92, pricePerSqft: 425 },
  { month: "Feb", occupancy: 94, pricePerSqft: 430 },
  { month: "Mar", occupancy: 95, pricePerSqft: 435 },
  { month: "Apr", occupancy: 93, pricePerSqft: 440 },
  { month: "May", occupancy: 96, pricePerSqft: 445 },
  { month: "Jun", occupancy: 97, pricePerSqft: 450 },
];

const riskAnalysisData = [
  { month: "Jan", riskScore: 65, volatility: 12 },
  { month: "Feb", riskScore: 68, volatility: 14 },
  { month: "Mar", riskScore: 72, volatility: 15 },
  { month: "Apr", riskScore: 75, volatility: 13 },
  { month: "May", riskScore: 70, volatility: 11 },
  { month: "Jun", riskScore: 73, volatility: 12 },
];

export function MarketCharts({ data = [] }: MarketChartsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-500" />
            Property Value Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={propertyValueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="currentValue"
                  stroke="#10B981"
                  name="Current Value"
                />
                <Line
                  type="monotone"
                  dataKey="predictedValue"
                  stroke="#6366F1"
                  name="Predicted Value"
                />
                <Line
                  type="monotone"
                  dataKey="marketAverage"
                  stroke="#F43F5E"
                  name="Market Average"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Market Value & ROI Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={roiTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="marketValue"
                    stroke="#10B981"
                    fill="#10B98133"
                    name="Market Value"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="roi"
                    stroke="#6366F1"
                    fill="#6366F133"
                    name="ROI %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-500" />
              Price per Square Foot & Occupancy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar
                    yAxisId="left"
                    dataKey="pricePerSqft"
                    fill="#F59E0B"
                    name="Price/sqft"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="occupancy"
                    fill="#10B981"
                    name="Occupancy %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Market Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="riskScore"
                  stroke="#F43F5E"
                  fill="#F43F5E33"
                  name="Risk Score"
                />
                <Area
                  type="monotone"
                  dataKey="volatility"
                  stroke="#6366F1"
                  fill="#6366F133"
                  name="Volatility %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Risk Level</p>
              <p className="font-semibold text-yellow-500">High</p>
            </div>
            <div>
              <p className="text-muted-foreground">Volatility</p>
              <p className="font-semibold text-red-500">12.5%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Trend</p>
              <p className="font-semibold text-green-500">Down</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}