import { Brain, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";

interface PropertyAnalyticsProps {
  analytics: Tables<"property_analytics">;
}

export function PropertyAnalytics({ analytics }: PropertyAnalyticsProps) {
  if (!analytics) return null;

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Analytics & Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {analytics.ai_confidence_score && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                <span>AI Confidence Score</span>
              </div>
              <span className="font-medium">
                {analytics.ai_confidence_score}%
              </span>
            </div>
          )}
          {analytics.predicted_growth && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Predicted Growth</span>
              </div>
              <span className="font-medium text-green-600">
                {analytics.predicted_growth}%
              </span>
            </div>
          )}
          {analytics.cap_rate && (
            <div className="flex items-center justify-between">
              <span>Cap Rate</span>
              <span className="font-medium">{analytics.cap_rate}%</span>
            </div>
          )}
          {analytics.roi && (
            <div className="flex items-center justify-between">
              <span>ROI</span>
              <span className="font-medium">{analytics.roi}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}