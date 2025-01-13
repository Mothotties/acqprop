import { Card, CardContent } from "@/components/ui/card";
import { Activity, DollarSign, LineChart, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MarketMetricsGridProps {
  averageMarketValue: number;
  averageDemandScore: number;
  marketTrend?: string;
  totalProperties: number;
}

export function MarketMetricsGrid({
  averageMarketValue = 750000,
  averageDemandScore = 85,
  marketTrend = 'Growing',
  totalProperties = 150,
}: MarketMetricsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Average Market Value</p>
            <DollarSign className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            ${averageMarketValue.toLocaleString()}
          </p>
          <Badge className="mt-2 bg-green-100 text-green-800">+5.2% Growth</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Market Demand</p>
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            {averageDemandScore}/100
          </p>
          <Badge className="mt-2 bg-blue-100 text-blue-800">High Demand</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Market Trend</p>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold">{marketTrend}</p>
            <Badge className="mt-2 bg-purple-100 text-purple-800">
              Positive Outlook
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Properties Analyzed</p>
            <LineChart className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            {totalProperties}
          </p>
          <Badge className="mt-2 bg-orange-100 text-orange-800">Active Listings</Badge>
        </CardContent>
      </Card>
    </div>
  );
}