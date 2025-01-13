import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, DollarSign, Building2, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

// Fetch property analytics data
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

  // Calculate aggregated metrics
  const calculateMetrics = () => {
    if (!analyticsData || analyticsData.length === 0) return null;

    const totalProperties = analyticsData.length;
    const avgRoi = analyticsData.reduce((acc, curr) => acc + (curr.roi || 0), 0) / totalProperties;
    const avgOccupancy = analyticsData.reduce((acc, curr) => acc + (curr.occupancy_rate || 0), 0) / totalProperties;
    const avgConfidence = analyticsData.reduce((acc, curr) => acc + (curr.ai_confidence_score || 0), 0) / totalProperties;

    return {
      totalProperties,
      avgRoi: avgRoi.toFixed(1),
      avgOccupancy: avgOccupancy.toFixed(1),
      avgConfidence: avgConfidence.toFixed(1),
    };
  };

  const metrics = calculateMetrics();

  // Transform data for charts
  const performanceData = analyticsData?.map(item => ({
    property: item.property?.title?.substring(0, 15) + '...',
    roi: item.roi || 0,
    occupancy: item.occupancy_rate || 0,
  })) || [];

  const propertyMetrics = [
    {
      title: "Total Properties",
      value: metrics?.totalProperties || 0,
      trend: "+2",
      icon: <Building2 className="w-4 h-4 text-blue-500" />,
      positive: true,
    },
    {
      title: "Average ROI",
      value: `${metrics?.avgRoi || 0}%`,
      trend: "+3.1%",
      icon: <TrendingUp className="w-4 h-4 text-indigo-500" />,
      positive: true,
    },
    {
      title: "Avg Occupancy",
      value: `${metrics?.avgOccupancy || 0}%`,
      trend: "+2.3%",
      icon: <Building2 className="w-4 h-4 text-blue-500" />,
      positive: true,
    },
    {
      title: "AI Confidence",
      value: `${metrics?.avgConfidence || 0}%`,
      trend: "+1.5%",
      icon: <Brain className="w-4 h-4 text-yellow-500" />,
      positive: true,
    },
  ];

  if (isLoading) {
    return <div className="p-4">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Property Analytics</h2>
        </div>
        <div className="flex items-center gap-4">
          <Select onValueChange={setPropertyType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange
            date={dateRange}
            setDate={setDateRange}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {propertyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2">
                <p
                  className={`text-xs ${
                    metric.positive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {metric.trend}
                </p>
                <Badge
                  variant="secondary"
                  className={`${
                    metric.positive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {metric.positive ? "Increase" : "Decrease"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>ROI Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="property" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="roi" fill="#10B981" name="ROI %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="property" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#6366F1"
                    name="Occupancy Rate %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}