import { TabsContent } from "@/components/ui/tabs";
import { InvestmentOpportunities } from "@/components/InvestmentOpportunities";
import { InvestmentOpportunityScoring } from "@/components/InvestmentOpportunityScoring";

export function MainDashboardTab({ active }: { active: boolean }) {
  return (
    <TabsContent value="main" className="space-y-6">
      <div className="grid gap-6">
        {/* AI-Powered Investment Section */}
        <InvestmentOpportunityScoring />
        
        {/* Investment Opportunities */}
        <InvestmentOpportunities />
      </div>
    </TabsContent>
  );
}