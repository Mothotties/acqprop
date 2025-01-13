import { PropertySearch } from "@/components/PropertySearch";
import { PropertySorting, type SortOption } from "@/components/analytics/PropertySorting";
import { useState } from "react";
import { type PropertyFilters as Filters } from "@/components/PropertySearch";

interface PropertyFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: SortOption) => void;
}

export function PropertyFilters({ onSearch, onFilterChange, onSortChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    searchQuery: "",
    propertyType: "all",
    priceRange: [0, 1000000],
    minBeds: null,
    minBaths: null,
    minSqft: null,
    nearMe: false,
    newListings: false,
  });

  const handleFiltersChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="space-y-4">
      <PropertySearch 
        onSearch={onSearch} 
        onFilterChange={onFilterChange}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      <PropertySorting onSortChange={onSortChange} />
    </div>
  );
}