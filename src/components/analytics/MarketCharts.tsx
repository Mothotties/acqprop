import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Building2, TrendingUp } from "lucide-react";

interface MarketData {
  property: string;
  marketValue: number;
  pricePerSqft: number;
}

interface MarketChartsProps {
  data: MarketData[];
}

// Enhanced sample data
const sampleMarketData = [
  { property: "Luxury Condo A", marketValue: 850000, pricePerSqft: 425, roi: 8.5, occupancy: 95 },
  { property: "Downtown Office B", marketValue: 1200000, pricePerSqft: 380, roi: 7.2, occupancy: 88 },
  { property: "Retail Space C", marketValue: 750000, pricePerSqft: 350, roi: 6.8, occupancy: 92 },
  { property: "Residential Complex D", marketValue: 950000, pricePerSqft: 290, roi: 9.1, occupancy: 96 },
  { property: "Industrial Park E", marketValue: 1500000, pricePerSqft: 275, roi: 7.9, occupancy: 89 },
  { property: "Mixed-Use Building F", marketValue: 2000000, pricePerSqft: 410, roi: 8.8, occupancy: 94 },
  { property: "Suburban Office G", marketValue: 1100000, pricePerSqft: 325, roi: 7.5, occupancy: 91 },
];

export function MarketCharts({ data = sampleMarketData }: Partial<MarketChartsProps>) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            Market Value & ROI Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="property" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="marketValue"
                  stroke="#10B981"
                  name="Market Value"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="roi"
                  stroke="#6366F1"
                  name="ROI %"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-500" />
            Price per Square Foot & Occupancy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="property" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar 
                  yAxisId="left"
                  dataKey="pricePerSqft" 
                  fill="#F59E0B" 
                  name="Price/sq ft"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  yAxisId="right"
                  dataKey="occupancy" 
                  fill="#10B981" 
                  name="Occupancy %"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}