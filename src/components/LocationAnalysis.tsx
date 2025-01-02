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

export function LocationAnalysis() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Population Growth"
          value="+4.0%"
          icon={<Users className="w-4 h-4" />}
          trend="Growing"
          positive={true}
        />
        <MetricCard
          title="Property Value Trend"
          value="+8.2%"
          icon={<Home className="w-4 h-4" />}
          trend="Rising"
          positive={true}
        />
        <MetricCard
          title="School Rating"
          value="8.5/10"
          icon={<School className="w-4 h-4" />}
          trend="Top 10%"
          positive={true}
        />
        <MetricCard
          title="Business Growth"
          value="+12"
          icon={<ShoppingBag className="w-4 h-4" />}
          trend="Expanding"
          positive={true}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Population Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={populationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="population" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Neighborhood Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <NeighborhoodMetric
                icon={<Car className="w-4 h-4" />}
                title="Transit Score"
                value="85/100"
                description="Excellent public transportation"
              />
              <NeighborhoodMetric
                icon={<Heart className="w-4 h-4" />}
                title="Quality of Life"
                value="92/100"
                description="High livability score"
              />
              <NeighborhoodMetric
                icon={<ShoppingBag className="w-4 h-4" />}
                title="Amenities"
                value="95/100"
                description="Abundant shopping and dining"
              />
              <NeighborhoodMetric
                icon={<School className="w-4 h-4" />}
                title="Education"
                value="88/100"
                description="Strong school district"
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
}

function NeighborhoodMetric({ icon, title, value, description }: NeighborhoodMetricProps) {
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
      </div>
    </div>
  );
}