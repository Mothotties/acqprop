import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  title: string;
  price: number;
  type: string;
  location: string;
  metrics: {
    capRate: number;
    roi: number;
    cashFlow: number;
  };
}

export function PropertyCard({ title, price, type, location, metrics }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-up">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="text-gold-dark bg-gold-light/10">
            {type}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{location}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-primary">
              ${price.toLocaleString()}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <MetricItem label="Cap Rate" value={`${metrics.capRate}%`} />
            <MetricItem label="ROI" value={`${metrics.roi}%`} />
            <MetricItem
              label="Cash Flow"
              value={`$${metrics.cashFlow.toLocaleString()}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}