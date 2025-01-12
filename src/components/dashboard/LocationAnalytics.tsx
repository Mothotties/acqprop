import { LocationAnalysis } from "@/components/LocationAnalysis";
import { LocationSection } from "@/components/LocationSection";

export function LocationAnalytics() {
  return (
    <>
      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <LocationAnalysis />
      </section>

      <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <LocationSection />
      </section>
    </>
  );
}