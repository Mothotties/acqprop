import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FilterIcon } from "lucide-react";

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
}

export interface PropertyFilters {
  priceRange: string;
  propertyType: string;
  location: string;
}

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const handleFilterChange = (key: keyof PropertyFilters, value: string) => {
    onFilterChange({
      priceRange: key === 'priceRange' ? value : '',
      propertyType: key === 'propertyType' ? value : '',
      location: key === 'location' ? value : '',
    });
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <FilterIcon className="w-4 h-4" />
        <h3 className="font-medium">Filter Properties</h3>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Select onValueChange={(value) => handleFilterChange('priceRange', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-500000">$0 - $500,000</SelectItem>
            <SelectItem value="500000-1000000">$500,000 - $1M</SelectItem>
            <SelectItem value="1000000-plus">$1M+</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange('propertyType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="industrial">Industrial</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Location"
          onChange={(e) => handleFilterChange('location', e.target.value)}
        />
      </div>
    </div>
  );
}