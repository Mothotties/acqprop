import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AnalyticsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Portfolio Value"
        value="$2.4M"
        trend="+12.5%"
        positive
      />
      <MetricCard
        title="Average Cap Rate"
        value="7.2%"
        trend="+0.5%"
        positive
      />
      <MetricCard
        title="Monthly Cash Flow"
        value="$15,750"
        trend="-2.3%"
        positive={false}
      />
      <MetricCard
        title="Properties"
        value="12"
        trend="+2"
        positive
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  positive: boolean;
}

function MetricCard({ title, value, trend, positive }: MetricCardProps) {
  return (
    <Card className="animate-fade-up">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${positive ? "text-green-500" : "text-red-500"}`}>
          {trend}
        </p>
      </CardContent>
    </Card>
  );
}