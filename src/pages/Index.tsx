import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { AIPredictiveAnalytics } from "@/components/AIPredictiveAnalytics";
import { MarketAnalyticsDashboard } from "@/components/MarketAnalyticsDashboard";
import { PropertyAnalyticsDashboard } from "@/components/PropertyAnalyticsDashboard";
import { InvestmentOpportunityScoring } from "@/components/InvestmentOpportunityScoring";
import { RiskAssessmentDashboard } from "@/components/RiskAssessmentDashboard";
import { AIPortfolioPerformance } from "@/components/portfolio/AIPortfolioPerformance";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { NavigationTabs } from "@/components/NavigationTabs";

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
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold">
          <span className="text-sm">✨ Next-Generation Real Estate Platform</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Discover Your Next
          <br />
          <span className="text-gold">Investment Opportunity</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The world's first fully integrated, AI-powered real estate ecosystem that
          revolutionizes property investment
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="bg-gold hover:bg-gold/90 text-white px-6 py-2 rounded-full inline-flex items-center gap-2">
            🔍 Explore Properties
          </button>
          <button className="bg-background hover:bg-muted px-6 py-2 rounded-full inline-flex items-center gap-2 border">
            Learn More →
          </button>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />

      {/* Main Content */}
      <Tabs 
        defaultValue="portfolio"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full space-y-8"
      >
        <NavigationTabs />
        
        <TabsContent value="portfolio" className="space-y-8">
          <AIPortfolioPerformance />
          <PropertyAnalyticsDashboard />
          <MarketAnalyticsDashboard />
          <InvestmentOpportunityScoring />
          <RiskAssessmentDashboard />
        </TabsContent>

        <TabsContent value="ai" className="space-y-8">
          <AIPredictiveAnalytics />
        </TabsContent>

        <TabsContent value="properties" className="space-y-8">
          <PropertyAnalyticsDashboard />
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-8">
          <MarketAnalyticsDashboard />
          <AIPredictiveAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;