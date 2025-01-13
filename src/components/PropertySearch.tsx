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

interface PropertySearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
}

export function PropertySearch({ onSearch, onFilterChange }: PropertySearchProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by location, property type, or keywords..."
            className="pl-9"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <Select onValueChange={onFilterChange} defaultValue="all">
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
              Price Range
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4 p-4">
              <h4 className="font-medium">Price Range</h4>
              <div className="space-y-2">
                <Slider
                  defaultValue={[0, 1000000]}
                  max={5000000}
                  step={50000}
                  className="w-full"
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
        <Button variant="outline" size="sm" className="h-8">
          <BedDouble className="w-4 h-4 mr-2" />
          2+ Beds
        </Button>
        <Button variant="outline" size="sm" className="h-8">
          <Bath className="w-4 h-4 mr-2" />
          2+ Baths
        </Button>
        <Button variant="outline" size="sm" className="h-8">
          <Square className="w-4 h-4 mr-2" />
          1000+ sqft
        </Button>
        <Button variant="outline" size="sm" className="h-8">
          <MapPin className="w-4 h-4 mr-2" />
          Near me
        </Button>
        <Button variant="outline" size="sm" className="h-8">
          <Home className="w-4 h-4 mr-2" />
          New listings
        </Button>
      </div>
    </div>
  );
}