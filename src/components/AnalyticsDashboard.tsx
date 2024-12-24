import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Wallet, Building } from "lucide-react";

export function AnalyticsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Portfolio Value"
        value="$2.4M"
        trend="+12.5%"
        positive
        icon={<DollarSign className="w-4 h-4" />}
      />
      <MetricCard
        title="Average Cap Rate"
        value="7.2%"
        trend="+0.5%"
        positive
        icon={<TrendingUp className="w-4 h-4" />}
      />
      <MetricCard
        title="Monthly Cash Flow"
        value="$15,750"
        trend="-2.3%"
        positive={false}
        icon={<Wallet className="w-4 h-4" />}
      />
      <MetricCard
        title="Properties"
        value="12"
        trend="+2"
        positive
        icon={<Building className="w-4 h-4" />}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  positive: boolean;
  icon: React.ReactNode;
}

function MetricCard({ title, value, trend, positive, icon }: MetricCardProps) {
  return (
    <Card className="animate-fade-up border-gold/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <Badge 
          variant="secondary" 
          className={positive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
        >
          {trend}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}