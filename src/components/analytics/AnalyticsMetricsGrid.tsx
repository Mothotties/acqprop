import { AnalyticsMetricCard } from "./AnalyticsMetricCard";
import { Brain } from "lucide-react";

interface MetricsData {
  totalProperties: number;
  avgRoi: string;
  avgOccupancy: string;
  avgConfidence: string;
}

interface AnalyticsMetricsGridProps {
  metrics: MetricsData;
}

export function AnalyticsMetricsGrid({ metrics }: AnalyticsMetricsGridProps) {
  const propertyMetrics = [
    {
      title: "Total Properties",
      value: metrics.totalProperties.toString(),
      trend: "+2",
      icon: <Brain className="w-4 h-4 text-blue-500" />,
      positive: true,
    },
    {
      title: "Average ROI",
      value: `${metrics.avgRoi}%`,
      trend: "+3.1%",
      icon: <Brain className="w-4 h-4 text-indigo-500" />,
      positive: true,
    },
    {
      title: "Avg Occupancy",
      value: `${metrics.avgOccupancy}%`,
      trend: "+2.3%",
      icon: <Brain className="w-4 h-4 text-blue-500" />,
      positive: true,
    },
    {
      title: "AI Confidence",
      value: `${metrics.avgConfidence}%`,
      trend: "+1.5%",
      icon: <Brain className="w-4 h-4 text-yellow-500" />,
      positive: true,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {propertyMetrics.map((metric, index) => (
        <AnalyticsMetricCard key={index} {...metric} />
      ))}
    </div>
  );
}