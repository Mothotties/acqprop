import { DollarSign, Building2, Users, TrendingUp, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioPerformanceMetrics } from "@/components/PortfolioPerformanceMetrics";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function MainDashboardAnalytics() {
  const { data: portfolioStats, isLoading } = useQuery({
    queryKey: ['portfolio-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          id,
          price,
          property_analytics (
            roi,
            predicted_growth,
            ai_confidence_score
          )
        `);

      if (error) {
        toast.error('Failed to fetch portfolio statistics');
        throw error;
      }

      return data;
    }
  });

  const totalValue = portfolioStats?.reduce((sum, property) => sum + (property.price || 0), 0) || 0;
  const averageRoi = portfolioStats?.reduce((sum, property) => 
    sum + (property.property_analytics?.[0]?.roi || 0), 0) / (portfolioStats?.length || 1) || 0;
  const totalProperties = portfolioStats?.length || 0;
  const averageGrowth = portfolioStats?.reduce((sum, property) => 
    sum + (property.property_analytics?.[0]?.predicted_growth || 0), 0) / (portfolioStats?.length || 1) || 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRoi.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              +4.5% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              +2 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predicted Growth</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageGrowth.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              AI Confidence: High
            </p>
          </CardContent>
        </Card>
      </div>

      <PortfolioPerformanceMetrics />
    </div>
  );
}