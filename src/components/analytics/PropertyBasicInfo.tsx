import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

interface PropertyBasicInfoProps {
  property: Tables<"properties"> & {
    property_analytics?: Tables<"property_analytics">[];
    property_market_data?: Tables<"property_market_data">[];
  };
}

export function PropertyBasicInfo({ property }: PropertyBasicInfoProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Price</span>
        <span className="font-medium">${property.price?.toLocaleString()}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Location</span>
        <span className="font-medium">{property.location}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Property Type</span>
        <span className="font-medium">{property.property_type}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Size</span>
        <span className="font-medium">{property.square_feet} sq ft</span>
      </div>
    </div>
  );
}