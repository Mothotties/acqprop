import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  DollarSign,
  Home,
  MapPin,
  BedDouble,
  Bath,
  Square,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface PropertySearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  filters: PropertyFilters;
  onFiltersChange: (filters: Partial<PropertyFilters>) => void;
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

export function PropertySearch({ onSearch, onFilterChange, filters, onFiltersChange }: PropertySearchProps) {
  const handleFilterChange = (updates: Partial<PropertyFilters>) => {
    onFiltersChange(updates);
    
    // Notify parent components of filter changes
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
          />
        </div>
        
        <Select 
          value={filters.propertyType}
          onValueChange={(value) => handleFilterChange({ propertyType: value })}
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
            <Button variant="outline" className="w-[200px]">
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
        >
          <BedDouble className="w-4 h-4 mr-2" />
          2+ Beds
        </Button>
        <Button
          variant={filters.minBaths === 2 ? "default" : "outline"}
          size="sm"
          className="h-8"
          onClick={() => toggleFilter("minBaths", 2)}
        >
          <Bath className="w-4 h-4 mr-2" />
          2+ Baths
        </Button>
        <Button
          variant={filters.minSqft === 1000 ? "default" : "outline"}
          size="sm"
          className="h-8"
          onClick={() => toggleFilter("minSqft", 1000)}
        >
          <Square className="w-4 h-4 mr-2" />
          1000+ sqft
        </Button>
        <Button
          variant={filters.nearMe ? "default" : "outline"}
          size="sm"
          className="h-8"
          onClick={() => toggleFilter("nearMe", true)}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Near me
        </Button>
        <Button
          variant={filters.newListings ? "default" : "outline"}
          size="sm"
          className="h-8"
          onClick={() => toggleFilter("newListings", true)}
        >
          <Home className="w-4 h-4 mr-2" />
          New listings
        </Button>
      </div>
    </div>
  );
}
