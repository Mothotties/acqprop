import { useEffect, useRef } from "react";
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
  const mounted = useRef(true);
  const lastCheck = useRef(Date.now());
  const MIN_CHECK_INTERVAL = 2000; // 2 seconds minimum between checks

  useEffect(() => {
    // Rate limiting check
    const now = Date.now();
    if (now - lastCheck.current < MIN_CHECK_INTERVAL) {
      return;
    }
    lastCheck.current = now;

    // Check if not authenticated
    if (!session && mounted.current) {
      console.log("No session found in Index, redirecting to /auth");
      navigate("/auth");
      return;
    }

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Index auth state changed:", event, !!session);
      
      if (!mounted.current) return;
      
      if (event === 'SIGNED_OUT' || !session) {
        console.log("User signed out or session lost, redirecting to /auth");
        navigate("/auth");
      }
    });

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, [session, navigate]);

  if (!session) {
    console.log("No session in Index render, returning null");
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