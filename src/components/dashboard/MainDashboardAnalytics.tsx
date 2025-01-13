import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { PropertyViewer3D } from "@/components/PropertyViewer3D";
import { MarketIntelligenceDashboard } from "@/components/MarketIntelligenceDashboard";
import { RiskAssessmentDashboard } from "@/components/RiskAssessmentDashboard";
import { ComparativeAnalysis } from "@/components/analytics/ComparativeAnalysis";
import { MarketMetricsGrid } from "@/components/analytics/MarketMetricsGrid";
import { HistoricalTrends } from "@/components/analytics/HistoricalTrends";
import { RealTimeMarketUpdates } from "@/components/analytics/RealTimeMarketUpdates";
import { AIMarketPredictions } from "@/components/analytics/AIMarketPredictions";
import { MarketAlerts } from "@/components/analytics/MarketAlerts";
import { PropertyComparison } from "@/components/analytics/PropertyComparison";

export function MainDashboardAnalytics() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <AnalyticsDashboard />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <RealTimeMarketUpdates />
        <AIMarketPredictions />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <PropertyComparison />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <PropertyViewer3D />
        <MarketAlerts />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <MarketMetricsGrid
          averageMarketValue={750000}
          averageDemandScore={85}
          marketTrend="Growing"
          totalProperties={150}
        />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <ComparativeAnalysis data={comparativeData} />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <HistoricalTrends />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <MarketIntelligenceDashboard />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <RiskAssessmentDashboard />
      </section>
    </div>
  );
}
