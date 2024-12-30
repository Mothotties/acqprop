import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Building2, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PropertyMetrics } from "@/components/PropertyMetrics";

interface PropertyCardProps {
  title: string;
  price: number;
  type: string;
  location: string;
  metrics: {
    capRate: number;
    roi: number;
    cashFlow: number;
    occupancyRate?: number;
    daysOnMarket?: number;
    appreciationRate?: number;
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-up border-gold/10 hover:border-gold/20">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Building2 className="w-4 h-4" /> {location}
            </p>
          </div>
          <Badge variant="secondary" className="text-gold-dark bg-gold-light/10">
            {type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-primary">
              ${price.toLocaleString()}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gold hover:text-gold-dark hover:bg-gold-light/10"
              onClick={handleViewDetails}
            >
              View Details <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <MetricItem label="Cap Rate" value={`${metrics.capRate}%`} icon={<TrendingUp className="w-4 h-4" />} />
            <MetricItem label="ROI" value={`${metrics.roi}%`} icon={<DollarSign className="w-4 h-4" />} />
            <MetricItem
              label="Cash Flow"
              value={`$${metrics.cashFlow.toLocaleString()}`}
              icon={<DollarSign className="w-4 h-4" />}
            />
            {metrics.occupancyRate && (
              <MetricItem
                label="Occupancy"
                value={`${metrics.occupancyRate}%`}
                icon={<Building2 className="w-4 h-4" />}
              />
            )}
            {metrics.daysOnMarket && (
              <MetricItem
                label="Days Listed"
                value={metrics.daysOnMarket.toString()}
                icon={<Calendar className="w-4 h-4" />}
              />
            )}
            {metrics.appreciationRate && (
              <MetricItem
                label="Appreciation"
                value={`${metrics.appreciationRate}%`}
                icon={<TrendingUp className="w-4 h-4" />}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

function MetricItem({ label, value, icon }: MetricItemProps) {
  return (
    <div className="space-y-1 text-center">
      {icon && <div className="flex justify-center text-muted-foreground mb-1">{icon}</div>}
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}