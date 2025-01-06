import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Wallet, Building, Brain, ChartBar, Globe } from "lucide-react";

export function AnalyticsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="AI-Powered Insights"
        value="98.5%"
        trend="Accuracy"
        positive
        icon={<Brain className="w-4 h-4" />}
      />
      <MetricCard
        title="Market Analysis"
        value="Real-time"
        trend="Live Data"
        positive
        icon={<ChartBar className="w-4 h-4" />}
      />
      <MetricCard
        title="Global Properties"
        value="12,500+"
        trend="+15%"
        positive
        icon={<Globe className="w-4 h-4" />}
      />
      <MetricCard
        title="Portfolio Value"
        value="$2.4B"
        trend="+12.5%"
        positive
        icon={<DollarSign className="w-4 h-4" />}
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