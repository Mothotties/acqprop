import { TabsContent } from "@/components/ui/tabs";
import { PropertyAnalytics } from "@/components/dashboard/PropertyAnalytics";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Suspense } from "react";
import { LoadingFallback } from "../LoadingFallback";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, TrendingUp, AlertTriangle } from "lucide-react";

export function PropertiesTab({ active }: { active: boolean }) {
  const { toast } = useToast();
  
  const { data: propertyCount } = useQuery({
    queryKey: ['properties-count'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('properties')
          .select('*', { count: 'exact', head: true });
          
        if (error) throw error;
        return count || 0;
      } catch (error) {
        console.error('Error fetching property count:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load property count"
        });
        return 0;
      }
    },
    enabled: active,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000
  });

  const { data: riskMetrics } = useQuery({
    queryKey: ['risk-metrics'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('property_analytics')
          .select('risk_score, market_volatility')
          .limit(5);

        if (error) throw error;

        const avgRiskScore = data?.reduce((acc, curr) => acc + (curr.risk_score || 0), 0) / (data?.length || 1);
        const avgVolatility = data?.reduce((acc, curr) => acc + (curr.market_volatility || 0), 0) / (data?.length || 1);

        return {
          averageRiskScore: avgRiskScore || 0,
          averageVolatility: avgVolatility || 0
        };
      } catch (error) {
        console.error('Error fetching risk metrics:', error);
        return { averageRiskScore: 0, averageVolatility: 0 };
      }
    },
    enabled: active,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000
  });

  return (
    <TabsContent value="properties" className="space-y-6">
      {active && (
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary>
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Properties
                    </CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{propertyCount || 0}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Risk Score
                    </CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {riskMetrics?.averageRiskScore.toFixed(1) || '0.0'}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Market Volatility
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {riskMetrics?.averageVolatility.toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <PropertyAnalytics />
            </div>
          </ErrorBoundary>
        </Suspense>
      )}
    </TabsContent>
  );
}