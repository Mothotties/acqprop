import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Filter,
  DollarSign,
  Home,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Loader2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by location, property type, or keywords..."
            className="pl-9"
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
            disabled={isLoading}
          />
        </div>
        
        <Select 
          value={filters.propertyType}
          onValueChange={(value) => handleFilterChange({ propertyType: value })}
          disabled={isLoading}
        >
          <SelectTrigger className="w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="industrial">Industrial</SelectItem>
            <SelectItem value="land">Land</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px]" disabled={isLoading}>
              <DollarSign className="w-4 h-4 mr-2" />
              ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4 p-4">
              <h4 className="font-medium">Price Range</h4>
              <div className="space-y-2">
                <Slider
                  value={filters.priceRange}
                  max={5000000}
                  step={50000}
                  className="w-full"
                  onValueChange={(value) => handleFilterChange({ priceRange: value as [number, number] })}
                  disabled={isLoading}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$0</span>
                  <span>$5M+</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={filters.minBeds === 2 ? "default" : "outline"}
          size="sm"
          className="h-8"
          onClick={() => toggleFilter("minBeds", 2)}
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
          onClick={() => toggleFilter("minBaths", 2)}
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
          onClick={() => toggleFilter("minSqft", 1000)}
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
          onClick={() => toggleFilter("nearMe", true)}
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
          onClick={() => toggleFilter("newListings", true)}
          disabled={isLoading}
        >
          <Home className="w-4 h-4 mr-2" />
          New listings
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </div>
    </div>
  );
}