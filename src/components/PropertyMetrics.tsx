import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  DollarSign,
  Building2,
  Calendar,
  PieChart,
  ArrowUpRight,
  AlertTriangle,
  Target,
  Activity,
  TrendingDown,
} from "lucide-react";

interface PropertyMetricsProps {
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

export function PropertyMetrics({ metrics }: PropertyMetricsProps) {
  const getRiskColor = (score: number) => {
    if (score <= 3) return "bg-green-100 text-green-800";
    if (score <= 7) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getGrowthIndicator = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Financial Performance"
        metrics={[
          { label: "Cap Rate", value: `${metrics.capRate}%`, icon: <TrendingUp className="w-4 h-4" /> },
          { label: "ROI", value: `${metrics.roi}%`, icon: <DollarSign className="w-4 h-4" /> },
          { label: "Cash Flow", value: `$${metrics.cashFlow.toLocaleString()}`, icon: <DollarSign className="w-4 h-4" /> },
          metrics.predictedGrowth !== undefined && {
            label: "Predicted Growth",
            value: `${metrics.predictedGrowth}%`,
            icon: getGrowthIndicator(metrics.predictedGrowth),
          },
        ].filter(Boolean)}
      />
      
      <MetricCard
        title="Property Status"
        metrics={[
          metrics.occupancyRate && { 
            label: "Occupancy", 
            value: `${metrics.occupancyRate}%`, 
            icon: <Building2 className="w-4 h-4" /> 
          },
          metrics.daysOnMarket && { 
            label: "Days Listed", 
            value: metrics.daysOnMarket.toString(), 
            icon: <Calendar className="w-4 h-4" /> 
          },
          metrics.marketVolatility && {
            label: "Market Volatility",
            value: `${metrics.marketVolatility}%`,
            icon: <Activity className="w-4 h-4" />,
            badge: {
              text: metrics.marketVolatility <= 15 ? "Low" : metrics.marketVolatility <= 30 ? "Medium" : "High",
              className: metrics.marketVolatility <= 15 ? "bg-green-100 text-green-800" : 
                        metrics.marketVolatility <= 30 ? "bg-yellow-100 text-yellow-800" : 
                        "bg-red-100 text-red-800",
            },
          },
        ].filter(Boolean)}
      />
      
      <MetricCard
        title="Market Analysis"
        metrics={[
          metrics.appreciationRate && { 
            label: "Appreciation", 
            value: `${metrics.appreciationRate}%`, 
            icon: <ArrowUpRight className="w-4 h-4" /> 
          },
          metrics.marketTrend && { 
            label: "Market Trend", 
            value: metrics.marketTrend, 
            icon: <PieChart className="w-4 h-4" /> 
          },
          metrics.aiConfidenceScore && {
            label: "AI Confidence",
            value: `${metrics.aiConfidenceScore}%`,
            icon: <Target className="w-4 h-4" />,
            badge: {
              text: metrics.aiConfidenceScore >= 90 ? "High" : metrics.aiConfidenceScore >= 70 ? "Medium" : "Low",
              className: metrics.aiConfidenceScore >= 90 ? "bg-green-100 text-green-800" : 
                        metrics.aiConfidenceScore >= 70 ? "bg-yellow-100 text-yellow-800" : 
                        "bg-red-100 text-red-800",
            },
          },
        ].filter(Boolean)}
      />
      
      {metrics.riskScore && (
        <MetricCard
          title="Risk Assessment"
          metrics={[
            {
              label: "Risk Score",
              value: `${metrics.riskScore}/10`,
              icon: <AlertTriangle className="w-4 h-4" />,
              badge: {
                text: metrics.riskScore <= 3 ? "Low" : metrics.riskScore <= 7 ? "Medium" : "High",
                className: getRiskColor(metrics.riskScore),
              },
            },
          ]}
        />
      )}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  metrics: Array<{
    label: string;
    value: string;
    icon?: React.ReactNode;
    badge?: {
      text: string;
      className: string;
    };
  }>;
}

function MetricCard({ title, metrics }: MetricCardProps) {
  return (
    <Card className="animate-fade-up border-gold/10">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {metric.icon}
                <span className="text-sm text-muted-foreground">{metric.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{metric.value}</span>
                {metric.badge && (
                  <Badge variant="secondary" className={metric.badge.className}>
                    {metric.badge.text}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}