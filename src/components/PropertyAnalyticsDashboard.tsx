import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AnalyticsHeader } from "./analytics/AnalyticsHeader";
import { AnalyticsMetricsGrid } from "./analytics/AnalyticsMetricsGrid";
import { AnalyticsCharts } from "./analytics/AnalyticsCharts";
import { ComparativeAnalysis } from "./analytics/ComparativeAnalysis";
import { MarketTrendsRadar } from "./analytics/MarketTrendsRadar";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { toast } from "sonner";
import { exportToCSV } from "@/utils/exportUtils";

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

  const comparativeData = analyticsData?.map(item => ({
    property: item.property?.title?.substring(0, 15) + '...',
    currentValue: item.property?.price || 0,
    predictedValue: (item.property?.price || 0) * (1 + (item.predicted_growth || 0) / 100),
    marketAverage: (item.property?.price || 0) * 0.95, // Example market average calculation
  })) || [];

  const marketTrendsData = [
    { metric: "Price Growth", current: 85, predicted: 92 },
    { metric: "Demand", current: 75, predicted: 82 },
    { metric: "Supply", current: 60, predicted: 55 },
    { metric: "Market Sentiment", current: 70, predicted: 78 },
    { metric: "Economic Factors", current: 65, predicted: 70 },
  ];

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

      <div className="grid gap-6 md:grid-cols-2">
        <AnalyticsCharts performanceData={performanceData} />
        <MarketTrendsRadar data={marketTrendsData} />
      </div>

      <ComparativeAnalysis data={comparativeData} />
    </div>
  );
}