import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Globe, DollarSign } from "lucide-react";

export function AnalyticsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="AI-Powered Insights"
        value="98.5%"
        trend="Accuracy"
        positive
        icon={<Brain className="w-4 h-4 text-ai" />}
        gradient="from-ai/10 to-ai-dark/5"
      />
      <MetricCard
        title="Market Analysis"
        value="Real-time"
        trend="Live Data"
        positive
        icon={<TrendingUp className="w-4 h-4 text-green-500" />}
        gradient="from-green-500/10 to-green-600/5"
      />
      <MetricCard
        title="Global Properties"
        value="12,500+"
        trend="+15%"
        positive
        icon={<Globe className="w-4 h-4 text-blue-500" />}
        gradient="from-blue-500/10 to-blue-600/5"
      />
      <MetricCard
        title="Portfolio Value"
        value="$2.4B"
        trend="+12.5%"
        positive
        icon={<DollarSign className="w-4 h-4 text-gold" />}
        gradient="from-gold/10 to-gold-dark/5"
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
  gradient: string;
}

function MetricCard({ title, value, trend, positive, icon, gradient }: MetricCardProps) {
  return (
    <Card className="animate-fade-up relative overflow-hidden border-gold/10 hover:border-gold/20 transition-colors group">
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
      
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <Badge 
          variant="secondary" 
          className={`
            ${positive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
            transition-all duration-300 group-hover:scale-105
          `}
        >
          {trend}
        </Badge>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}