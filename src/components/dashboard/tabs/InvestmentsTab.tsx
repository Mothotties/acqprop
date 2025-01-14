import { TabsContent } from "@/components/ui/tabs";
import { InvestmentAnalytics } from "@/components/dashboard/InvestmentAnalytics";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Suspense } from "react";
import { LoadingFallback } from "../LoadingFallback";

export function InvestmentsTab({ active }: { active: boolean }) {
  return (
    <TabsContent value="investments" className="space-y-6">
      {active && (
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary>
            <InvestmentAnalytics />
          </ErrorBoundary>
        </Suspense>
      )}
    </TabsContent>
  );
}