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
  averageMarketValue,
  averageDemandScore,
  marketTrend = 'Stable',
  totalProperties,
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
            ${averageMarketValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Market Demand</p>
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            {averageDemandScore.toFixed(1)}/100
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Market Trend</p>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2">
            <Badge className="bg-green-100 text-green-800">
              {marketTrend}
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
        </CardContent>
      </Card>
    </div>
  );
}