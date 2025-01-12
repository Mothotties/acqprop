import { DashboardLayout } from "@/components/DashboardLayout";
import { MainDashboardAnalytics } from "@/components/dashboard/MainDashboardAnalytics";
import { PropertyAnalytics } from "@/components/dashboard/PropertyAnalytics";
import { InvestmentAnalytics } from "@/components/dashboard/InvestmentAnalytics";
import { LocationAnalytics } from "@/components/dashboard/LocationAnalytics";
import { PortfolioDashboard } from "@/components/PortfolioDashboard";
import { DocumentManager } from "@/components/DocumentManager";
import { MaintenanceTracker } from "@/components/MaintenanceTracker";
import { PortfolioPerformanceMetrics } from "@/components/PortfolioPerformanceMetrics";
import { InvestmentOpportunityScoring } from "@/components/InvestmentOpportunityScoring";
import { InvestmentOpportunities } from "@/components/InvestmentOpportunities";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { NavigationTabs } from "@/components/NavigationTabs";
import { PropertiesSection } from "@/components/PropertiesSection";
import { LocationSection } from "@/components/LocationSection";
import { LocationAnalysis } from "@/components/LocationAnalysis";
import { PropertyEvaluationTools } from "@/components/PropertyEvaluationTools";
import { MarketIntelligenceDashboard } from "@/components/MarketIntelligenceDashboard";
import { AIPredictiveAnalytics } from "@/components/AIPredictiveAnalytics";
import { useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <DashboardLayout>
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full animate-fade-up delay-400"
      >
        <NavigationTabs />
        
        <TabsContent value="portfolio" className="space-y-6 mt-6">
          <PortfolioDashboard />
          <PortfolioPerformanceMetrics />
          <InvestmentOpportunityScoring />
          <InvestmentOpportunities />
        </TabsContent>

        <TabsContent value="ai" className="space-y-6 mt-6">
          <AIPredictiveAnalytics />
          <MarketIntelligenceDashboard />
        </TabsContent>

        <TabsContent value="properties" className="space-y-6 mt-6">
          <PropertiesSection />
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-6 mt-6">
          <DocumentManager />
        </TabsContent>
        
        <TabsContent value="maintenance" className="space-y-6 mt-6">
          <MaintenanceTracker />
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6 mt-6">
          <LocationAnalysis />
          <PropertyAnalytics />
        </TabsContent>
        
        <TabsContent value="location" className="space-y-6 mt-6">
          <LocationSection />
          <LocationAnalysis />
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-6 mt-6">
          <PropertyEvaluationTools />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;