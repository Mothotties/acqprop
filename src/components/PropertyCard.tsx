import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const handleViewDetails = () => {
    toast({
      title: "Property Details",
      description: `Viewing details for ${title}`,
    });
    console.log("Viewing property details:", { title, price, type, location, metrics });
  };

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
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gold"
              onClick={handleViewDetails}
            >
              View Details <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
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