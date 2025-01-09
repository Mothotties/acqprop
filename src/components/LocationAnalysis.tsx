import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  TrendingUp,
  Target,
  Activity,
  Car,
  School,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { MetricCard } from "./location/MetricCard";
import { PropertyTrends } from "./location/PropertyTrends";
import { PropertyDistribution } from "./location/PropertyDistribution";
import { NeighborhoodMetric } from "./location/NeighborhoodMetric";

const marketTrendData = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 105 },
  { month: "Mar", value: 108 },
  { month: "Apr", value: 112 },
  { month: "May", value: 115 },
  { month: "Jun", value: 120 },
];

const propertyTypeData = [
  { name: "Residential", value: 45 },
  { name: "Commercial", value: 25 },
  { name: "Industrial", value: 15 },
  { name: "Mixed-Use", value: 15 },
];

export function LocationAnalysis() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="AI Confidence Score"
          value="92%"
          icon={<Brain className="w-4 h-4" />}
          trend="High Confidence"
          positive={true}
        />
        <MetricCard
          title="Market Growth"
          value="+15.2%"
          icon={<TrendingUp className="w-4 h-4" />}
          trend="Outperforming"
          positive={true}
        />
        <MetricCard
          title="Investment Risk"
          value="Low"
          icon={<Target className="w-4 h-4" />}
          trend="Stable"
          positive={true}
        />
        <MetricCard
          title="Market Volatility"
          value="8.5%"
          icon={<Activity className="w-4 h-4" />}
          trend="Below Average"
          positive={true}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PropertyTrends data={marketTrendData} />
        <PropertyDistribution data={propertyTypeData} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Location Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <NeighborhoodMetric
              icon={<Car className="w-4 h-4" />}
              title="Transit Score"
              value="92/100"
              description="Excellent public transportation"
              trend="+5% YoY"
            />
            <NeighborhoodMetric
              icon={<School className="w-4 h-4" />}
              title="Education Quality"
              value="95/100"
              description="Top-rated school district"
              trend="+8% YoY"
            />
            <NeighborhoodMetric
              icon={<ShoppingBag className="w-4 h-4" />}
              title="Amenities Score"
              value="88/100"
              description="High-end shopping and dining"
              trend="+12% YoY"
            />
            <NeighborhoodMetric
              icon={<Heart className="w-4 h-4" />}
              title="Lifestyle Score"
              value="90/100"
              description="Premium quality of life"
              trend="+7% YoY"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}