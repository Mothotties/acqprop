import { MainDashboardAnalytics } from "@/components/dashboard/MainDashboardAnalytics";
import { InvestmentAnalytics } from "@/components/dashboard/InvestmentAnalytics";
import { PropertyAnalytics } from "@/components/dashboard/PropertyAnalytics";
import { LocationAnalytics } from "@/components/dashboard/LocationAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Suspense } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function Dashboard() {
  const queryClient = useQueryClient();

  // Prefetch data for other tabs to prevent freezing on tab switch
  useEffect(() => {
    // Prefetch analytics data
    queryClient.prefetchQuery({
      queryKey: ['portfolio-analytics'],
      queryFn: () => Promise.resolve(), // Your actual fetch function
      staleTime: 30000, // Consider data fresh for 30 seconds
    });

    // Prefetch investment data
    queryClient.prefetchQuery({
      queryKey: ['investment-analytics'],
      queryFn: () => Promise.resolve(), // Your actual fetch function
      staleTime: 30000,
    });

    // Prefetch property data
    queryClient.prefetchQuery({
      queryKey: ['property-analytics'],
      queryFn: () => Promise.resolve(), // Your actual fetch function
      staleTime: 30000,
    });

    // Prefetch location data
    queryClient.prefetchQuery({
      queryKey: ['location-analytics'],
      queryFn: () => Promise.resolve(), // Your actual fetch function
      staleTime: 30000,
    });
  }, [queryClient]);

  return (
    <div className="space-y-8">
      <Tabs defaultValue="main" className="space-y-6">
        <TabsList>
          <TabsTrigger value="main">Overview</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>
        
        <ErrorBoundary>
          <TabsContent value="main" className="space-y-6">
            <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
              <MainDashboardAnalytics />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="investments" className="space-y-6">
            <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
              <InvestmentAnalytics />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="properties" className="space-y-6">
            <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
              <PropertyAnalytics />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="location" className="space-y-6">
            <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
              <LocationAnalytics />
            </Suspense>
          </TabsContent>
        </ErrorBoundary>
      </Tabs>
    </div>
  );
}