import { Button } from "@/components/ui/button";
import { BedDouble, Bath, Square, MapPin, Home, Loader2 } from "lucide-react";
import { PropertyFilters } from "@/components/PropertySearch";

interface QuickFiltersProps {
  filters: PropertyFilters;
  onToggleFilter: (key: keyof PropertyFilters, value: any) => void;
  isLoading?: boolean;
}

export function QuickFilters({ filters, onToggleFilter, isLoading }: QuickFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={filters.minBeds === 2 ? "default" : "outline"}
        size="sm"
        className="h-8"
        onClick={() => onToggleFilter("minBeds", 2)}
        disabled={isLoading}
      >
        <BedDouble className="w-4 h-4 mr-2" />
        2+ Beds
        {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
      <Button
        variant={filters.minBaths === 2 ? "default" : "outline"}
        size="sm"
        className="h-8"
        onClick={() => onToggleFilter("minBaths", 2)}
        disabled={isLoading}
      >
        <Bath className="w-4 h-4 mr-2" />
        2+ Baths
        {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
      <Button
        variant={filters.minSqft === 1000 ? "default" : "outline"}
        size="sm"
        className="h-8"
        onClick={() => onToggleFilter("minSqft", 1000)}
        disabled={isLoading}
      >
        <Square className="w-4 h-4 mr-2" />
        1000+ sqft
        {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
      <Button
        variant={filters.nearMe ? "default" : "outline"}
        size="sm"
        className="h-8"
        onClick={() => onToggleFilter("nearMe", true)}
        disabled={isLoading}
      >
        <MapPin className="w-4 h-4 mr-2" />
        Near me
        {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
      <Button
        variant={filters.newListings ? "default" : "outline"}
        size="sm"
        className="h-8"
        onClick={() => onToggleFilter("newListings", true)}
        disabled={isLoading}
      >
        <Home className="w-4 h-4 mr-2" />
        New listings
        {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
    </div>
  );
}