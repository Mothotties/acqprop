import { PropertyValueChart } from "./charts/PropertyValueChart";
import { MarketValueChart } from "./charts/MarketValueChart";
import { OccupancyChart } from "./charts/OccupancyChart";
import { RiskAnalysisChart } from "./charts/RiskAnalysisChart";

interface MarketChartsProps {
  data?: Array<{
    property: string;
    marketValue: number;
    pricePerSqft: number;
  }>;
}

export function MarketCharts({ data = [] }: MarketChartsProps) {
  return (
    <div className="space-y-6">
      <PropertyValueChart />
      
      <div className="grid gap-6 md:grid-cols-2">
        <MarketValueChart />
        <OccupancyChart />
      </div>

      <RiskAnalysisChart />
    </div>
  );
}