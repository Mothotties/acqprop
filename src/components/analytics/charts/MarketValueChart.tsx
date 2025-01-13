import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const roiTrendsData = [
  { month: "Jan", roi: 7.2, marketValue: 850000 },
  { month: "Feb", roi: 7.5, marketValue: 860000 },
  { month: "Mar", roi: 7.8, marketValue: 870000 },
  { month: "Apr", roi: 8.1, marketValue: 885000 },
  { month: "May", roi: 8.4, marketValue: 890000 },
  { month: "Jun", roi: 8.7, marketValue: 900000 },
];

export function MarketValueChart() {
  return (
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
  );
}