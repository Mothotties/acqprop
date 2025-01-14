import { TabsContent } from "@/components/ui/tabs";
import { LocationAnalytics } from "@/components/dashboard/LocationAnalytics";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Suspense } from "react";
import { LoadingFallback } from "../LoadingFallback";

export function LocationTab({ active }: { active: boolean }) {
  return (
    <TabsContent value="location" className="space-y-6">
      {active && (
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary>
            <LocationAnalytics />
          </ErrorBoundary>
        </Suspense>
      )}
    </TabsContent>
  );
}