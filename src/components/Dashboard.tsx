import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { PortfolioPerformanceMetrics } from "@/components/PortfolioPerformanceMetrics";
import { InvestmentOpportunities } from "@/components/InvestmentOpportunities";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function Dashboard() {
  const { data: portfolioStats } = useQuery({
    queryKey: ['portfolio-stats'],
    queryFn: async () => {
      const { data: properties, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_analytics (
            ai_confidence_score,
            roi,
            occupancy_rate
          ),
          property_market_data (
            market_value
          )
        `);

      if (error) throw error;

      const totalProperties = properties?.length || 0;
      const monthlyRevenue = properties?.reduce((sum, p) => 
        sum + (p.property_market_data?.[0]?.market_value || 0) * 0.008, 0) || 0;
      const avgOccupancy = properties?.reduce((sum, p) => 
        sum + (p.property_analytics?.[0]?.occupancy_rate || 0), 0) / (totalProperties || 1);
      const avgRoi = properties?.reduce((sum, p) => 
        sum + (p.property_analytics?.[0]?.roi || 0), 0) / (totalProperties || 1);

      return {
        totalProperties,
        monthlyRevenue,
        avgOccupancy,
        avgRoi
      };
    }
  });

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Top level metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Properties"
          value={portfolioStats?.totalProperties || 0}
          trend="+2"
          type="properties"
        />
        <MetricCard
          title="Monthly Revenue"
          value={`$${(portfolioStats?.monthlyRevenue || 0).toLocaleString()}`}
          trend="+8.2%"
          type="revenue"
        />
        <MetricCard
          title="Avg Occupancy"
          value={`${(portfolioStats?.avgOccupancy || 0).toFixed(1)}%`}
          trend="-2.3%"
          type="occupancy"
        />
        <MetricCard
          title="ROI"
          value={`${(portfolioStats?.avgRoi || 0).toFixed(1)}%`}
          trend="+1.2%"
          type="roi"
        />
      </div>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />

      {/* Portfolio Performance */}
      <PortfolioPerformanceMetrics />

      {/* Investment Opportunities */}
      <InvestmentOpportunities />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: string;
  type: 'properties' | 'revenue' | 'occupancy' | 'roi';
}

function MetricCard({ title, value, trend, type }: MetricCardProps) {
  const getTrendColor = () => {
    if (trend.startsWith('+')) return 'text-green-500';
    if (trend.startsWith('-')) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="p-6 rounded-lg border border-border bg-card">
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">{value}</p>
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
}