import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Brain, TrendingUp, Building2, DollarSign } from "lucide-react";

export function PortfolioStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["portfolio-stats"],
    queryFn: async () => {
      const { data: properties, error } = await supabase
        .from("properties")
        .select(`
          *,
          property_analytics (
            ai_confidence_score,
            roi,
            predicted_growth
          )
        `);

      if (error) throw error;

      const totalValue = properties.reduce((sum, p) => sum + (p.price || 0), 0);
      const averageROI = properties.reduce((sum, p) => 
        sum + (p.property_analytics?.[0]?.roi || 0), 0) / properties.length;
      const aiConfidence = properties.reduce((sum, p) => 
        sum + (p.property_analytics?.[0]?.ai_confidence_score || 0), 0) / properties.length;

      return {
        totalProperties: properties.length,
        totalValue,
        averageROI,
        aiConfidence
      };
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Properties
          </CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "..." : data?.totalProperties}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Portfolio Value
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "..." : `$${(data?.totalValue || 0).toLocaleString()}`}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average ROI
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "..." : `${(data?.averageROI || 0).toFixed(1)}%`}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            AI Confidence
          </CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "..." : `${(data?.aiConfidence || 0).toFixed(1)}%`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}