import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
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
import { InvestmentOpportunityScoring } from "@/components/InvestmentOpportunityScoring";
import { RiskAssessmentDashboard } from "@/components/RiskAssessmentDashboard";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { NavigationTabs } from "@/components/NavigationTabs";
import { useState } from "react";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("portfolio");

  useEffect(() => {
    if (!session) {
      navigate("/auth");
    }
  }, [session, navigate]);

  if (!session) {
    return null;
  }

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
          <InvestmentOpportunityScoring />
          <RiskAssessmentDashboard />
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