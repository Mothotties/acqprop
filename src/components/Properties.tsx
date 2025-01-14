import { PropertyListingView } from "@/components/PropertyListingView";
import { LocationAnalysis } from "@/components/LocationAnalysis";
import { PropertyAnalytics } from "@/components/analytics/PropertyAnalytics";
import { AISearchInterface } from "@/components/search/AISearchInterface";

export function Properties() {
  return (
    <div className="space-y-8 animate-fade-up">
      <AISearchInterface />
      
      <PropertyListingView />
      
      <div className="grid gap-6 md:grid-cols-2">
        <LocationAnalysis />
        <PropertyAnalytics />
      </div>
    </div>
  );
}