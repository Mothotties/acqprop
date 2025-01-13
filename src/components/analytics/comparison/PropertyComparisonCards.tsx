import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { PropertyImageGallery } from "../PropertyImageGallery";
import { PropertyBasicInfo } from "../PropertyBasicInfo";
import { PropertyAnalyticsInfo } from "../PropertyAnalyticsInfo";
import { PropertyMarketInfo } from "../PropertyMarketInfo";

interface PropertyComparisonCardsProps {
  properties: any[];
}

export function PropertyComparisonCards({ properties }: PropertyComparisonCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <Card key={property.id} className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              {property.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <PropertyImageGallery 
              images={property.images || []} 
              title={property.title} 
            />
            <PropertyBasicInfo property={property} />
            {property.property_analytics?.[0] && (
              <PropertyAnalyticsInfo analytics={property.property_analytics[0]} />
            )}
            {property.property_market_data?.[0] && (
              <PropertyMarketInfo marketData={property.property_market_data[0]} />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}