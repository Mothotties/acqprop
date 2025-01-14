import { PropertyEvaluationTools } from "@/components/PropertyEvaluationTools";
import { AIPredictiveAnalytics } from "@/components/AIPredictiveAnalytics";
import { PropertyMetrics } from "@/components/PropertyMetrics";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const sampleProperty = {
  metrics: {
    capRate: 5.8,
    roi: 12.4,
    cashFlow: 25000,
    occupancyRate: 95,
    daysOnMarket: 45,
    appreciationRate: 4.2,
    riskScore: 3,
    marketTrend: "Growing",
  },
};

export function PropertyAnalytics() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['property-analytics-summary'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_analytics')
        .select('*')
        .limit(5)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  return (
    <>
      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <PropertyEvaluationTools />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <AIPredictiveAnalytics />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <PropertyMetrics metrics={sampleProperty.metrics} />
      </section>
    </>
  );
}