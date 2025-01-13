import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { AnalyticsHeader } from "./analytics/AnalyticsHeader";
import { AnalyticsMetricsGrid } from "./analytics/AnalyticsMetricsGrid";
import { AnalyticsCharts } from "./analytics/AnalyticsCharts";
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

  return (
    <div className="space-y-6">
      <AnalyticsHeader
        propertyType={propertyType}
        dateRange={dateRange}
        onPropertyTypeChange={setPropertyType}
        onDateRangeChange={setDateRange}
        onExport={handleExport}
      />

      <AnalyticsMetricsGrid metrics={metrics} />

      <AnalyticsCharts performanceData={performanceData} />
    </div>
  );
}