import { Brain, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { AnalyticsMetricCard } from "./analytics/AnalyticsMetricCard";
import { AnalyticsFilters } from "./analytics/AnalyticsFilters";
import { AnalyticsCharts } from "./analytics/AnalyticsCharts";
import { Button } from "./ui/button";
import { exportToCSV } from "@/utils/exportUtils";
import { toast } from "sonner";

const fetchPropertyAnalytics = async (propertyType?: string, dateRange?: DateRange) => {
  let query = supabase
    .from('property_analytics')
    .select(`
      *,
      property:properties(
        title,
        price,
        location,
        property_type
      )
    `);

  if (propertyType) {
    query = query.eq('property.property_type', propertyType);
  }

  if (dateRange?.from && dateRange?.to) {
    query = query.gte('created_at', dateRange.from.toISOString())
                .lte('created_at', dateRange.to.toISOString());
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
};

export function PropertyAnalyticsDashboard() {
  const [propertyType, setPropertyType] = useState<string>();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['propertyAnalytics', propertyType, dateRange],
    queryFn: () => fetchPropertyAnalytics(propertyType, dateRange),
  });

  const handleExport = () => {
    if (!analyticsData?.length) {
      toast.error("No data available to export");
      return;
    }

    const exportData = analyticsData.map(item => ({
      Property: item.property?.title || 'N/A',
      ROI: item.roi || 0,
      OccupancyRate: item.occupancy_rate || 0,
      AIConfidence: item.ai_confidence_score || 0,
      MarketTrend: item.market_trend || 'N/A',
      CreatedAt: item.created_at
    }));

    exportToCSV(exportData, `property-analytics-${new Date().toISOString().split('T')[0]}`);
    toast.success("Analytics data exported successfully");
  };

  if (isLoading) {
    return <div className="p-4">Loading analytics...</div>;
  }

  const metrics = analyticsData?.length ? {
    totalProperties: analyticsData.length,
    avgRoi: (analyticsData.reduce((acc, curr) => acc + (curr.roi || 0), 0) / analyticsData.length).toFixed(1),
    avgOccupancy: (analyticsData.reduce((acc, curr) => acc + (curr.occupancy_rate || 0), 0) / analyticsData.length).toFixed(1),
    avgConfidence: (analyticsData.reduce((acc, curr) => acc + (curr.ai_confidence_score || 0), 0) / analyticsData.length).toFixed(1),
  } : { totalProperties: 0, avgRoi: '0', avgOccupancy: '0', avgConfidence: '0' };

  const performanceData = analyticsData?.map(item => ({
    property: item.property?.title?.substring(0, 15) + '...',
    roi: item.roi || 0,
    occupancy: item.occupancy_rate || 0,
  })) || [];

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Property Analytics</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Data
          </Button>
          <AnalyticsFilters
            propertyType={propertyType}
            dateRange={dateRange}
            onPropertyTypeChange={setPropertyType}
            onDateRangeChange={setDateRange}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {propertyMetrics.map((metric, index) => (
          <AnalyticsMetricCard key={index} {...metric} />
        ))}
      </div>

      <AnalyticsCharts performanceData={performanceData} />
    </div>
  );
}