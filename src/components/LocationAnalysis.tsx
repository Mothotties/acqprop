import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  TrendingUp,
  Users,
  Home,
  School,
  ShoppingBag,
  Car,
  Heart,
  Brain,
  Target,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const populationData = [
  { year: "2019", population: 45000 },
  { year: "2020", population: 47000 },
  { year: "2021", population: 48500 },
  { year: "2022", population: 50000 },
  { year: "2023", population: 52000 },
];

const marketTrendData = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 105 },
  { month: "Mar", value: 108 },
  { month: "Apr", value: 112 },
  { month: "May", value: 115 },
  { month: "Jun", value: 120 },
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Market Value Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

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
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  positive: boolean;
}

function MetricCard({ title, value, icon, trend, positive }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <Badge
          variant="secondary"
          className={positive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
        >
          {trend}
        </Badge>
      </CardContent>
    </Card>
  );
}

interface NeighborhoodMetricProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  trend: string;
}

function NeighborhoodMetric({ icon, title, value, description, trend }: NeighborhoodMetricProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="font-bold">{value}</span>
        <Badge variant="secondary" className="ml-2 bg-gold-light/10 text-gold-dark">
          {trend}
        </Badge>
      </div>
    </div>
  );
}