interface ROIInsightsProps {
  roiValue: number;
  occupancyRate: number;
  confidenceScore: number;
}

export function ROIInsights({ roiValue, occupancyRate, confidenceScore }: ROIInsightsProps) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold">AI Insights</h4>
      <p className="text-sm text-muted-foreground">
        Portfolio performance shows strong growth with a {roiValue}% ROI prediction. 
        Occupancy rates remain high at {occupancyRate}%, indicating robust demand. 
        Market conditions and AI confidence levels ({confidenceScore}%) suggest continued 
        positive momentum for the next quarter.
      </p>
    </div>
  );
}