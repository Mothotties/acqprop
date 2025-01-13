import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RiskMetricsGrid } from "./risk/RiskMetricsGrid";
import { RiskTrendsChart } from "./risk/RiskTrendsChart";
import { RiskFactorsAnalysis } from "./risk/RiskFactorsAnalysis";

export function RiskAssessmentDashboard() {
  const { data: propertyAnalytics, isLoading } = useQuery({
    queryKey: ['propertyAnalytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_analytics')
        .select(`
          *,
          property:properties(
            title,
            location,
            price
          )
        `)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading risk assessment data...</div>;
  }

  const latestAnalytics = propertyAnalytics?.[0] || {
    risk_score: 0,
    market_volatility: 0,
    ai_confidence_score: 0,
    market_trend: 'Stable',
  };

  // Sample historical data for the trends chart
  const trendData = propertyAnalytics?.map((item, index) => ({
    date: `Day ${index + 1}`,
    riskScore: item.risk_score || 0,
    marketVolatility: item.market_volatility || 0,
  })) || [];

  // Sample risk factors for analysis
  const riskFactors = [
    {
      name: "Market Volatility",
      impact: "High" as const,
      trend: "Increasing" as const,
      description: "Significant market fluctuations observed in the past quarter",
    },
    {
      name: "Economic Indicators",
      impact: "Medium" as const,
      trend: "Stable" as const,
      description: "Key economic indicators showing stability with moderate growth",
    },
    {
      name: "Regulatory Changes",
      impact: "Low" as const,
      trend: "Decreasing" as const,
      description: "No major regulatory changes expected in the near term",
    },
  ];

  return (
    <div className="space-y-6">
      <RiskMetricsGrid
        riskScore={latestAnalytics.risk_score}
        marketVolatility={latestAnalytics.market_volatility}
        confidenceScore={latestAnalytics.ai_confidence_score}
        marketTrend={latestAnalytics.market_trend}
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <RiskTrendsChart data={trendData} />
        <RiskFactorsAnalysis factors={riskFactors} />
      </div>
    </div>
  );
}