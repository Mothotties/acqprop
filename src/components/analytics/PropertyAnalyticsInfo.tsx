import { Tables } from "@/integrations/supabase/types";

interface PropertyAnalyticsInfoProps {
  analytics: Tables<"property_analytics">;
}

export function PropertyAnalyticsInfo({ analytics }: PropertyAnalyticsInfoProps) {
  return (
    <div className="pt-4 border-t">
      <h4 className="text-sm font-medium mb-2">Analytics</h4>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">AI Score</span>
          <span className="font-medium">
            {analytics?.ai_confidence_score || 'N/A'}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">ROI</span>
          <span className="font-medium text-green-600">
            {analytics?.roi || 'N/A'}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Risk Score</span>
          <span className="font-medium">
            {analytics?.risk_score || 'N/A'}/10
          </span>
        </div>
      </div>
    </div>
  );
}