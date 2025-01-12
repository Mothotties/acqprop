import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Building2, TrendingUp, DollarSign, Calendar, Brain, Target, Activity } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PropertyMetrics } from "@/components/PropertyMetrics";
import { useNavigate } from "react-router-dom";

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
    riskScore?: number;
    marketTrend?: string;
    aiConfidenceScore?: number;
    predictedGrowth?: number;
    marketVolatility?: number;
  };
}

export function PropertyCard({ title, price, type, location, metrics }: PropertyCardProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/properties/${title}`);
  };

  const getAIScoreBadge = (score: number) => {
    if (score >= 90) return { text: "High Confidence", class: "bg-green-100 text-green-800" };
    if (score >= 70) return { text: "Medium Confidence", class: "bg-yellow-100 text-yellow-800" };
    return { text: "Low Confidence", class: "bg-red-100 text-red-800" };
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
            {metrics.aiConfidenceScore && (
              <Badge 
                variant="secondary" 
                className={getAIScoreBadge(metrics.aiConfidenceScore).class}
              >
                <Brain className="w-4 h-4 mr-1" />
                {getAIScoreBadge(metrics.aiConfidenceScore).text}
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <MetricItem 
              label="Cap Rate" 
              value={`${metrics.capRate}%`} 
              icon={<TrendingUp className="w-4 h-4" />} 
            />
            <MetricItem 
              label="ROI" 
              value={`${metrics.roi}%`} 
              icon={<DollarSign className="w-4 h-4" />} 
            />
            <MetricItem
              label="Cash Flow"
              value={`$${metrics.cashFlow.toLocaleString()}`}
              icon={<DollarSign className="w-4 h-4" />}
            />
            {metrics.predictedGrowth && (
              <MetricItem
                label="AI Growth Prediction"
                value={`${metrics.predictedGrowth}%`}
                icon={<Brain className="w-4 h-4" />}
                positive={metrics.predictedGrowth > 0}
              />
            )}
            {metrics.marketVolatility && (
              <MetricItem
                label="Market Volatility"
                value={`${metrics.marketVolatility}%`}
                icon={<Activity className="w-4 h-4" />}
                badge={{
                  text: metrics.marketVolatility <= 15 ? "Low" : metrics.marketVolatility <= 30 ? "Medium" : "High",
                  className: metrics.marketVolatility <= 15 ? "bg-green-100 text-green-800" : 
                            metrics.marketVolatility <= 30 ? "bg-yellow-100 text-yellow-800" : 
                            "bg-red-100 text-red-800"
                }}
              />
            )}
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-gold hover:text-gold-dark hover:bg-gold-light/10"
            onClick={handleViewDetails}
          >
            View Details <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  positive?: boolean;
  badge?: {
    text: string;
    className: string;
  };
}

function MetricItem({ label, value, icon, positive, badge }: MetricItemProps) {
  return (
    <div className="space-y-1 text-center">
      {icon && <div className="flex justify-center text-muted-foreground mb-1">{icon}</div>}
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center justify-center gap-2">
        <p className={`text-lg font-semibold ${positive !== undefined ? (positive ? 'text-green-600' : 'text-red-600') : ''}`}>
          {value}
        </p>
        {badge && (
          <Badge variant="secondary" className={badge.className}>
            {badge.text}
          </Badge>
        )}
      </div>
    </div>
  );
}
