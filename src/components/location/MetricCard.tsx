import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  positive: boolean;
}

export function MetricCard({ title, value, icon, trend, positive }: MetricCardProps) {
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