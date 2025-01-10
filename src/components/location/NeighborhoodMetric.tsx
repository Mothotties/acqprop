import { cn } from "@/lib/utils";

interface NeighborhoodMetricProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  trend: string;
}

export function NeighborhoodMetric({
  icon,
  title,
  value,
  description,
  trend,
}: NeighborhoodMetricProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold">{value}</p>
        <p className={cn(
          "text-sm",
          trend.startsWith("+") ? "text-green-600" : "text-red-600"
        )}>
          {trend}
        </p>
      </div>
    </div>
  );
}