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
import { MarketIntelligenceDashboard } from "@/components/MarketIntelligenceDashboard";
import { AIPredictiveAnalytics } from "@/components/AIPredictiveAnalytics";
import { LocationAnalysis } from "@/components/LocationAnalysis";
import { LocationSection } from "@/components/LocationSection";
import { PropertyEvaluationTools } from "@/components/PropertyEvaluationTools";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-6 animate-fade-up delay-300">
        <MainDashboardAnalytics />
        <PropertyAnalytics />
        <InvestmentAnalytics />
        <LocationAnalytics />
      </div>

      <Tabs defaultValue="portfolio" className="w-full animate-fade-up delay-400">
        <NavigationTabs />
        
        <TabsContent value="portfolio" className="space-y-6 mt-6">
          <PortfolioDashboard />
          <PortfolioPerformanceMetrics />
          <InvestmentOpportunityScoring />
          <InvestmentOpportunities />
        </TabsContent>

        <TabsContent value="market" className="space-y-6 mt-6">
          <MarketIntelligenceDashboard />
        </TabsContent>

        <TabsContent value="ai" className="space-y-6 mt-6">
          <AIPredictiveAnalytics />
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
        </TabsContent>
        
        <TabsContent value="location" className="space-y-6 mt-6">
          <LocationSection />
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-6 mt-6">
          <PropertyEvaluationTools />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;