import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { PropertyViewer3D } from "@/components/PropertyViewer3D";
import { MarketIntelligenceDashboard } from "@/components/MarketIntelligenceDashboard";
import { RiskAssessmentDashboard } from "@/components/RiskAssessmentDashboard";
import { ComparativeAnalysis } from "@/components/analytics/ComparativeAnalysis";
import { MarketMetricsGrid } from "@/components/analytics/MarketMetricsGrid";
import { HistoricalTrends } from "@/components/analytics/HistoricalTrends";
import { RealTimeMarketUpdates } from "@/components/analytics/RealTimeMarketUpdates";

export function MainDashboardAnalytics() {
  const comparativeData = [
    {
      property: "Property A",
      currentValue: 500000,
      predictedValue: 550000,
      marketAverage: 525000,
    },
    {
      property: "Property B",
      currentValue: 750000,
      predictedValue: 800000,
      marketAverage: 775000,
    },
    {
      property: "Property C",
      currentValue: 1000000,
      predictedValue: 1100000,
      marketAverage: 1050000,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <AnalyticsDashboard />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <RealTimeMarketUpdates />
        <PropertyViewer3D />
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