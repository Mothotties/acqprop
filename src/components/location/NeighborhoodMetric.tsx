import { Badge } from "@/components/ui/badge";

interface NeighborhoodMetricProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  trend: string;
}

export function NeighborhoodMetric({ icon, title, value, description, trend }: NeighborhoodMetricProps) {
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