import { MainDashboardAnalytics } from "@/components/dashboard/MainDashboardAnalytics";
import { InvestmentAnalytics } from "@/components/dashboard/InvestmentAnalytics";
import { PropertyAnalytics } from "@/components/dashboard/PropertyAnalytics";
import { LocationAnalytics } from "@/components/dashboard/LocationAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Suspense, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Fetch functions with error handling and limits
const fetchPortfolioAnalytics = async () => {
  try {
    const { data, error } = await supabase
      .from('property_analytics')
      .select(`
        *,
        property:properties(title, price, location)
      `)
      .limit(5); // Reduced limit
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching portfolio analytics:', error);
    toast.error('Failed to fetch portfolio data');
    return [];
  }
};

const fetchInvestmentAnalytics = async () => {
  try {
    const { data, error } = await supabase
      .from('investment_opportunities')
      .select(`
        *,
        property:properties(title, price, location)
      `)
      .limit(5); // Reduced limit
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching investment analytics:', error);
    toast.error('Failed to fetch investment data');
    return [];
  }
};

const fetchPropertyAnalytics = async () => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_analytics(*),
        property_market_data(*)
      `)
      .limit(5); // Reduced limit
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching property analytics:', error);
    toast.error('Failed to fetch property data');
    return [];
  }
};

const fetchLocationAnalytics = async () => {
  try {
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
      .limit(5); // Reduced limit
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching location analytics:', error);
    toast.error('Failed to fetch location data');
    return [];
  }
};

export function Dashboard() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('main');

  // Prefetch data with proper error handling and cache configuration
  const prefetchData = async (queryKey: string, fetchFn: () => Promise<any>) => {
    try {
      await queryClient.prefetchQuery({
        queryKey: [queryKey],
        queryFn: fetchFn,
        staleTime: 30000,
        gcTime: 60000,
        retry: 2,
      });
    } catch (error) {
      console.error(`Error prefetching ${queryKey}:`, error);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Prefetch data based on the selected tab
    switch (value) {
      case 'main':
        prefetchData('portfolio-analytics', fetchPortfolioAnalytics);
        break;
      case 'investments':
        prefetchData('investment-analytics', fetchInvestmentAnalytics);
        break;
      case 'properties':
        prefetchData('property-analytics', fetchPropertyAnalytics);
        break;
      case 'location':
        prefetchData('location-analytics', fetchLocationAnalytics);
        break;
    }
  };

  // Loading component for better UX
  const LoadingFallback = () => (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-muted rounded w-1/4"></div>
      <div className="h-96 bg-muted rounded-lg"></div>
    </div>
  );

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
            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary>
                <MainDashboardAnalytics />
              </ErrorBoundary>
            </Suspense>
          </TabsContent>
          
          <TabsContent value="investments" className="space-y-6">
            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary>
                <InvestmentAnalytics />
              </ErrorBoundary>
            </Suspense>
          </TabsContent>
          
          <TabsContent value="properties" className="space-y-6">
            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary>
                <PropertyAnalytics />
              </ErrorBoundary>
            </Suspense>
          </TabsContent>
          
          <TabsContent value="location" className="space-y-6">
            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary>
                <LocationAnalytics />
              </ErrorBoundary>
            </Suspense>
          </TabsContent>
        </ErrorBoundary>
      </Tabs>
    </div>
  );
}