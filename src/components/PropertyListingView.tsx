import { useState } from "react";
import { PropertySearch, type PropertyFilters } from "@/components/PropertySearch";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { type SortOption } from "@/components/analytics/PropertySorting";

export function PropertyListingView() {
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
  const [sortOption, setSortOption] = useState<SortOption>({
    field: "created_at",
    direction: "desc",
  });

  const handleFilterChange = (newFilters: Partial<PropertyFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
  };

  return (
    <div className="space-y-6">
      <PropertySearch 
        onSearch={(query) => handleFilterChange({ searchQuery: query })}
        onFilterChange={(filter) => handleFilterChange({ propertyType: filter })}
        filters={filters}
        onFiltersChange={handleFilterChange}
      />
      <PropertyGrid filters={filters} sortOption={sortOption} />
    </div>
  );
}