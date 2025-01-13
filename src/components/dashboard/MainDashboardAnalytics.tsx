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
import { PropertyHistoricalData } from "@/components/analytics/PropertyHistoricalData";
import { PropertyComparisonGrid } from "@/components/analytics/PropertyComparisonGrid";
import { useState } from "react";

export function MainDashboardAnalytics() {
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<string[]>([]);
  
  const handlePropertySelection = (propertyIds: string[]) => {
    setSelectedPropertyIds(propertyIds);
  };

  // Sample data for ComparativeAnalysis component
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
      currentValue: 600000,
      predictedValue: 650000,
      marketAverage: 625000,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <PropertyComparison onPropertySelect={handlePropertySelection} />
      </section>

      {selectedPropertyIds.length > 0 && (
        <>
          <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <PropertyComparisonGrid propertyIds={selectedPropertyIds} />
          </section>

          <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <PropertyHistoricalData propertyIds={selectedPropertyIds} />
          </section>
        </>
      )}

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