import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  positive: boolean;
}

export function AnalyticsMetricCard({ title, value, icon, trend, positive }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          {icon}
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{value}</p>
          <p className={cn(
            "text-sm",
            positive ? "text-green-600" : "text-red-600"
          )}>
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}