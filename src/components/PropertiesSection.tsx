import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyForm } from "@/components/PropertyForm";
import { PropertySearch } from "@/components/PropertySearch";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { type PropertyFilters } from "@/components/PropertySearch";

const sampleProperty = {
  title: "Luxury Apartment Complex",
  price: 2500000,
  type: "Multi-Family",
  location: "Beverly Hills, CA",
  metrics: {
    capRate: 5.8,
    roi: 12.4,
    cashFlow: 25000,
    occupancyRate: 95,
    daysOnMarket: 45,
    appreciationRate: 4.2,
    riskScore: 3,
    marketTrend: "Growing",
  },
};

export function PropertiesSection() {
  const [filters, setFilters] = useState<PropertyFilters>({
    searchQuery: "",
    propertyType: "all",
    priceRange: [0, 1000000],
    minBeds: null,
    minBaths: null,
    minSqft: null,
    nearMe: false,
    newListings: false,
  });

  const handleSearch = () => {};
  const handleFilterChange = () => {};
  const handleFiltersChange = (newFilters: Partial<PropertyFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="space-y-8">
      <PropertySearch 
        onSearch={handleSearch} 
        onFilterChange={handleFilterChange}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Premium Properties
        </h2>
        <Button variant="outline" className="gap-2 border-gold/20 hover:bg-gold/5">
          View All <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PropertyCard {...sampleProperty} />
        <PropertyCard
          {...sampleProperty}
          title="Downtown Office Building"
          price={4800000}
          type="Commercial"
        />
        <PropertyCard
          {...sampleProperty}
          title="Retail Plaza"
          price={3200000}
          type="Retail"
        />
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">
            Add New Property
          </h2>
          <PropertyForm />
        </div>
      </div>
    </div>
  );
}
