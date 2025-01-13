import { Tables } from "@/integrations/supabase/types";

interface PropertyMarketInfoProps {
  marketData: Tables<"property_market_data">;
}

export function PropertyMarketInfo({ marketData }: PropertyMarketInfoProps) {
  return (
    <div className="pt-4 border-t">
      <h4 className="text-sm font-medium mb-2">Market Data</h4>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Market Value</span>
          <span className="font-medium">
            ${marketData?.market_value?.toLocaleString() || 'N/A'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Price per sq ft</span>
          <span className="font-medium">
            ${marketData?.price_per_sqft?.toLocaleString() || 'N/A'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Demand Score</span>
          <span className="font-medium">
            {marketData?.market_demand_score || 'N/A'}/100
          </span>
        </div>
      </div>
    </div>
  );
}