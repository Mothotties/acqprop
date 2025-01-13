import { Skeleton } from "@/components/ui/skeleton";
import { SearchInput } from "./search/SearchInput";
import { PropertyTypeSelect } from "./search/PropertyTypeSelect";
import { PriceRangeFilter } from "./search/PriceRangeFilter";
import { QuickFilters } from "./search/QuickFilters";

interface PropertySearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  filters: PropertyFilters;
  onFiltersChange: (filters: Partial<PropertyFilters>) => void;
  isLoading?: boolean;
}

export interface PropertyFilters {
  searchQuery: string;
  propertyType: string;
  priceRange: [number, number];
  minBeds: number | null;
  minBaths: number | null;
  minSqft: number | null;
  nearMe: boolean;
  newListings: boolean;
}

export function PropertySearch({ 
  onSearch, 
  onFilterChange, 
  filters, 
  onFiltersChange,
  isLoading = false 
}: PropertySearchProps) {
  const handleFilterChange = (updates: Partial<PropertyFilters>) => {
    onFiltersChange(updates);
    
    if (updates.searchQuery !== undefined) {
      onSearch(updates.searchQuery);
    }
    if (updates.propertyType !== undefined) {
      onFilterChange(updates.propertyType);
    }
  };

  const toggleFilter = (key: keyof PropertyFilters, value: any) => {
    handleFilterChange({ [key]: filters[key] === value ? null : value });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-10 w-full md:w-[60%]" />
          <Skeleton className="h-10 w-full md:w-[200px]" />
          <Skeleton className="h-10 w-full md:w-[200px]" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchInput
          value={filters.searchQuery}
          onChange={(value) => handleFilterChange({ searchQuery: value })}
          disabled={isLoading}
        />
        
        <PropertyTypeSelect
          value={filters.propertyType}
          onValueChange={(value) => handleFilterChange({ propertyType: value })}
          disabled={isLoading}
        />

        <PriceRangeFilter
          value={filters.priceRange}
          onChange={(value) => handleFilterChange({ priceRange: value })}
          disabled={isLoading}
        />
      </div>

      <QuickFilters
        filters={filters}
        onToggleFilter={toggleFilter}
        isLoading={isLoading}
      />
    </div>
  );
}