import { TabsContent } from "@/components/ui/tabs";
import { PropertyAnalytics } from "@/components/dashboard/PropertyAnalytics";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Suspense } from "react";
import { LoadingFallback } from "../LoadingFallback";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function PropertiesTab({ active }: { active: boolean }) {
  const { toast } = useToast();
  
  // Only fetch data when tab is active
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
    staleTime: 30000, // Cache for 30 seconds
    gcTime: 5 * 60 * 1000 // Keep in cache for 5 minutes
  });

  return (
    <TabsContent value="properties" className="space-y-6">
      {active && (
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary>
            <div className="grid gap-6">
              <PropertyAnalytics />
            </div>
          </ErrorBoundary>
        </Suspense>
      )}
    </TabsContent>
  );
}