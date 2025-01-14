import { MainDashboardAnalytics } from "@/components/dashboard/MainDashboardAnalytics";
import { InvestmentAnalytics } from "@/components/dashboard/InvestmentAnalytics";
import { PropertyAnalytics } from "@/components/dashboard/PropertyAnalytics";
import { LocationAnalytics } from "@/components/dashboard/LocationAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Dashboard() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="main" className="space-y-6">
        <TabsList>
          <TabsTrigger value="main">Overview</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>
        
        <TabsContent value="main" className="space-y-6">
          <MainDashboardAnalytics />
        </TabsContent>
        
        <TabsContent value="investments" className="space-y-6">
          <InvestmentAnalytics />
        </TabsContent>
        
        <TabsContent value="properties" className="space-y-6">
          <PropertyAnalytics />
        </TabsContent>
        
        <TabsContent value="location" className="space-y-6">
          <LocationAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}