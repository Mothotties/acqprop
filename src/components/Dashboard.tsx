import { MainDashboardAnalytics } from "@/components/dashboard/MainDashboardAnalytics";
import { InvestmentAnalytics } from "@/components/dashboard/InvestmentAnalytics";
import { PropertyAnalytics } from "@/components/dashboard/PropertyAnalytics";
import { LocationAnalytics } from "@/components/dashboard/LocationAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Suspense, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Fetch functions for each tab
const fetchPortfolioAnalytics = async () => {
  const { data, error } = await supabase
    .from('property_analytics')
    .select(`
      *,
      property:properties(title, price, location)
    `)
    .limit(10);
  
  if (error) throw error;
  return data;
};

const fetchInvestmentAnalytics = async () => {
  const { data, error } = await supabase
    .from('investment_opportunities')
    .select(`
      *,
      property:properties(title, price, location)
    `)
    .limit(10);
  
  if (error) throw error;
  return data;
};

const fetchPropertyAnalytics = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_analytics(*),
      property_market_data(*)
    `)
    .limit(10);
  
  if (error) throw error;
  return data;
};

const fetchLocationAnalytics = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      id,
      location,
      coordinates,
      property_market_data(
        market_value,
        market_demand_score,
        local_market_trend
      )
    `)
    .limit(10);
  
  if (error) throw error;
  return data;
};

export function Dashboard() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('main');

  // Prefetch data for other tabs to prevent freezing on tab switch
  useEffect(() => {
    const prefetchData = async () => {
      // Prefetch analytics data
      await queryClient.prefetchQuery({
        queryKey: ['portfolio-analytics'],
        queryFn: fetchPortfolioAnalytics,
        staleTime: 30000,
      });

      // Prefetch investment data
      await queryClient.prefetchQuery({
        queryKey: ['investment-analytics'],
        queryFn: fetchInvestmentAnalytics,
        staleTime: 30000,
      });

      // Prefetch property data
      await queryClient.prefetchQuery({
        queryKey: ['property-analytics'],
        queryFn: fetchPropertyAnalytics,
        staleTime: 30000,
      });

      // Prefetch location data
      await queryClient.prefetchQuery({
        queryKey: ['location-analytics'],
        queryFn: fetchLocationAnalytics,
        staleTime: 30000,
      });
    };

    prefetchData();
  }, [queryClient]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Prefetch data for the next tab when user switches
    switch (value) {
      case 'main':
        queryClient.prefetchQuery({
          queryKey: ['portfolio-analytics'],
          queryFn: fetchPortfolioAnalytics,
          staleTime: 30000,
        });
        break;
      case 'investments':
        queryClient.prefetchQuery({
          queryKey: ['investment-analytics'],
          queryFn: fetchInvestmentAnalytics,
          staleTime: 30000,
        });
        break;
      case 'properties':
        queryClient.prefetchQuery({
          queryKey: ['property-analytics'],
          queryFn: fetchPropertyAnalytics,
          staleTime: 30000,
        });
        break;
      case 'location':
        queryClient.prefetchQuery({
          queryKey: ['location-analytics'],
          queryFn: fetchLocationAnalytics,
          staleTime: 30000,
        });
        break;
    }
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="main" className="space-y-6" onValueChange={handleTabChange}>
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