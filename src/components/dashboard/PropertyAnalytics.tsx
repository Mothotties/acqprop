import { PropertyEvaluationTools } from "@/components/PropertyEvaluationTools";
import { AIPredictiveAnalytics } from "@/components/AIPredictiveAnalytics";
import { PropertyMetrics } from "@/components/PropertyMetrics";

const sampleProperty = {
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

export function PropertyAnalytics() {
  return (
    <>
      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <PropertyEvaluationTools />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <AIPredictiveAnalytics />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <PropertyMetrics metrics={sampleProperty.metrics} />
      </section>
    </>
  );
}