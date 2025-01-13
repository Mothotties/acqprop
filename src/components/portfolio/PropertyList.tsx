import { PropertyCard } from "@/components/PropertyCard";
import { PropertyPaginationControls } from "./PropertyPaginationControls";
import type { Property } from "@/types/property";

interface PropertyListProps {
  properties: (Property & {
    property_analytics?: Array<{
      cap_rate: number | null;
      roi: number | null;
      ai_confidence_score: number | null;
      predicted_growth: number | null;
      market_volatility: number | null;
    }>;
  })[];
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export function PropertyList({
  properties,
  totalCount,
  currentPage,
  onPageChange,
  itemsPerPage,
}: PropertyListProps) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  if (!properties?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No properties found in your portfolio.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            title={property.title}
            price={property.price}
            type={property.property_type}
            location={property.location}
            metrics={{
              capRate: property.property_analytics?.[0]?.cap_rate || 0,
              roi: property.property_analytics?.[0]?.roi || 0,
              cashFlow: 0,
              aiConfidenceScore: property.property_analytics?.[0]?.ai_confidence_score || 0,
              predictedGrowth: property.property_analytics?.[0]?.predicted_growth || 0,
              marketVolatility: property.property_analytics?.[0]?.market_volatility || 0,
            }}
          />
        ))}
      </div>
      
      <PropertyPaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}