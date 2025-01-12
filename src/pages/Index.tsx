import { DashboardLayout } from "@/components/DashboardLayout";
import { MainDashboardAnalytics } from "@/components/dashboard/MainDashboardAnalytics";
import { PropertyAnalytics } from "@/components/dashboard/PropertyAnalytics";
import { InvestmentAnalytics } from "@/components/dashboard/InvestmentAnalytics";
import { LocationAnalytics } from "@/components/dashboard/LocationAnalytics";
import { PortfolioDashboard } from "@/components/PortfolioDashboard";
import { DocumentManager } from "@/components/DocumentManager";
import { MaintenanceTracker } from "@/components/MaintenanceTracker";
import { PropertyAnalyticsDashboard } from "@/components/PropertyAnalyticsDashboard";
import { PropertyListingView } from "@/components/PropertyListingView";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { NavigationTabs } from "@/components/NavigationTabs";
import { useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <DashboardLayout>
      <Tabs 
        defaultValue="portfolio"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full space-y-6"
      >
        <NavigationTabs />
        
        <TabsContent value="portfolio" className="space-y-6">
          <PortfolioDashboard />
          <PropertyAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <MainDashboardAnalytics />
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <PropertyListingView />
          <PropertyAnalytics />
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-6">
          <DocumentManager />
        </TabsContent>
        
        <TabsContent value="maintenance" className="space-y-6">
          <MaintenanceTracker />
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6">
          <MainDashboardAnalytics />
          <PropertyAnalytics />
        </TabsContent>
        
        <TabsContent value="location" className="space-y-6">
          <LocationAnalytics />
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-6">
          <PropertyAnalytics />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;