import { PortfolioDiversification } from "@/components/PortfolioDiversification";
import { PortfolioPerformanceMetrics } from "@/components/PortfolioPerformanceMetrics";
import { InvestmentOpportunityScoring } from "@/components/InvestmentOpportunityScoring";
import { InvestmentOpportunities } from "@/components/InvestmentOpportunities";

export function InvestmentAnalytics() {
  return (
    <>
      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <PortfolioDiversification />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <PortfolioPerformanceMetrics />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <InvestmentOpportunityScoring />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <InvestmentOpportunities />
      </section>
    </>
  );
}