import { ThemeToggle } from "@/components/ThemeToggle";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { PropertyViewer3D } from "@/components/PropertyViewer3D";
import { AIPredictiveAnalytics } from "@/components/AIPredictiveAnalytics";
import { PropertyMetrics } from "@/components/PropertyMetrics";
import { PropertyEvaluationTools } from "@/components/PropertyEvaluationTools";
import { PortfolioDashboard } from "@/components/PortfolioDashboard";
import { DocumentManager } from "@/components/DocumentManager";
import { MaintenanceTracker } from "@/components/MaintenanceTracker";
import { LocationAnalysis } from "@/components/LocationAnalysis";
import { RiskAssessmentDashboard } from "@/components/RiskAssessmentDashboard";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { NavigationTabs } from "@/components/NavigationTabs";
import { PropertiesSection } from "@/components/PropertiesSection";
import { LocationSection } from "@/components/LocationSection";

const sampleProperty = {
  title: "Luxury Apartment Complex",
  price: 2500000,
  type: "Multi-Family",
  location: "Beverly Hills, CA",
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <main className="container py-12 space-y-8">
        <Header />

        <div className="grid gap-6 animate-fade-up delay-300">
          <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <AnalyticsDashboard />
          </section>

          <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <PropertyViewer3D />
          </section>

          <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <AIPredictiveAnalytics />
          </section>

          <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <RiskAssessmentDashboard />
          </section>

          <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <PropertyMetrics metrics={sampleProperty.metrics} />
          </section>
        </div>

        <Tabs defaultValue="portfolio" className="w-full animate-fade-up delay-400">
          <NavigationTabs />
          
          <TabsContent value="portfolio" className="space-y-6 mt-6">
            <PortfolioDashboard />
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
      </main>
    </div>
  );
};

export default Index;