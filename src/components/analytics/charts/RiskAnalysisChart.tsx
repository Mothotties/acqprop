import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const riskAnalysisData = [
  { month: "Jan", riskScore: 65, volatility: 12 },
  { month: "Feb", riskScore: 68, volatility: 14 },
  { month: "Mar", riskScore: 72, volatility: 15 },
  { month: "Apr", riskScore: 75, volatility: 13 },
  { month: "May", riskScore: 70, volatility: 11 },
  { month: "Jun", riskScore: 73, volatility: 12 },
];

export function RiskAnalysisChart() {
  return (
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
  );
}