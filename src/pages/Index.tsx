import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PortfolioDashboard } from "@/components/PortfolioDashboard";
import { PropertyAnalyticsDashboard } from "@/components/PropertyAnalyticsDashboard";
import { MarketAnalyticsDashboard } from "@/components/MarketAnalyticsDashboard";
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
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (!session && mounted) {
          console.log("No valid session found, redirecting to /auth");
          navigate("/auth");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        if (mounted) {
          navigate("/auth");
        }
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && mounted) {
        console.log("Session ended, redirecting to /auth");
        navigate("/auth");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

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
          <MarketAnalyticsDashboard />
          <InvestmentOpportunityScoring />
          <RiskAssessmentDashboard />
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <PropertyAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <PortfolioDashboard />
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-6">
          <div>Documents section coming soon</div>
        </TabsContent>
        
        <TabsContent value="maintenance" className="space-y-6">
          <div>Maintenance section coming soon</div>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-6">
          <PropertyAnalyticsDashboard />
        </TabsContent>
        
        <TabsContent value="evaluation" className="space-y-6">
          <PropertyAnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;