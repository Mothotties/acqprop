import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { PropertyViewer3D } from "@/components/PropertyViewer3D";
import { MarketIntelligenceDashboard } from "@/components/MarketIntelligenceDashboard";
import { RiskAssessmentDashboard } from "@/components/RiskAssessmentDashboard";

export function MainDashboardAnalytics() {
  return (
    <>
      <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <AnalyticsDashboard />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <PropertyViewer3D />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <MarketIntelligenceDashboard />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <RiskAssessmentDashboard />
      </section>
    </>
  );
}