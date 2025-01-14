import { TabsContent } from "@/components/ui/tabs";
import { PropertyAnalytics } from "@/components/dashboard/PropertyAnalytics";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Suspense } from "react";
import { LoadingFallback } from "../LoadingFallback";

export function PropertiesTab({ active }: { active: boolean }) {
  return (
    <TabsContent value="properties" className="space-y-6">
      {active && (
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary>
            <PropertyAnalytics />
          </ErrorBoundary>
        </Suspense>
      )}
    </TabsContent>
  );
}