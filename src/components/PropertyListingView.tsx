import { useState, useEffect } from "react";
import { PropertySearch, type PropertyFilters } from "@/components/PropertySearch";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { type SortOption } from "@/components/analytics/PropertySorting";
import { getFiltersFromUrl, updateUrlWithFilters } from "@/utils/urlParams";
import { useToast } from "@/components/ui/use-toast";

export function PropertyListingView() {
  const { toast } = useToast();
  const [filters, setFilters] = useState<PropertyFilters>(() => ({
    searchQuery: "",
    propertyType: "all",
    priceRange: [0, 1000000],
    minBeds: null,
    minBaths: null,
    minSqft: null,
    nearMe: false,
    newListings: false,
    ...getFiltersFromUrl(), // Initialize with URL params
  }));
  
  const [sortOption, setSortOption] = useState<SortOption>({
    field: "created_at",
    direction: "desc",
  });

  useEffect(() => {
    // Update URL when filters change
    updateUrlWithFilters(filters);
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<PropertyFilters>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      return updated;
    });
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
    toast({
      title: "Sorting Updated",
      description: `Properties are now sorted by ${sort.field} ${sort.direction === "asc" ? "ascending" : "descending"}`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
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