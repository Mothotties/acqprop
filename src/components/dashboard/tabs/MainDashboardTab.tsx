import { TabsContent } from "@/components/ui/tabs";
import { MainDashboardAnalytics } from "@/components/dashboard/MainDashboardAnalytics";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Suspense } from "react";
import { LoadingFallback } from "../LoadingFallback";

export function MainDashboardTab({ active }: { active: boolean }) {
  return (
    <TabsContent value="main" className="space-y-6">
      {active && (
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary>
            <MainDashboardAnalytics />
          </ErrorBoundary>
        </Suspense>
      )}
    </TabsContent>
  );
}