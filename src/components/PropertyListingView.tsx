import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Home,
  DollarSign,
  Ruler,
  BedDouble,
  Bath,
  Car,
  Calendar,
  MapPin,
  TrendingUp,
  LayoutGrid,
  List,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  yearBuilt: number;
  type: string;
  status: "For Sale" | "For Rent" | "Pending" | "Sold";
  appreciation: number;
}

const propertyTypes = [
  "All Types",
  "Single Family",
  "Multi-Family",
  "Apartment",
  "Condo",
  "Commercial",
];

export function PropertyListingView() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Error fetching properties",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data || [];
    },
  });

  const filteredProperties = properties?.filter((property) => {
    const matchesSearch = property.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "All Types" || property.property_type === selectedType;
    const matchesPrice =
      property.price >= priceRange[0] && property.price <= priceRange[1];
    return matchesSearch && matchesType && matchesPrice;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <Slider
            defaultValue={[0, 5000000]}
            max={5000000}
            step={50000}
            value={priceRange}
            onValueChange={setPriceRange}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Property Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            : "space-y-4"
        }
      >
        {filteredProperties?.map((property) => (
          <Card
            key={property.id}
            className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${
              viewMode === "list" ? "flex" : ""
            }`}
          >
            <div className={viewMode === "list" ? "flex-1" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{property.title}</CardTitle>
                  <Badge variant="secondary">{property.status}</Badge>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(property.price)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {property.square_feet && (
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-muted-foreground" />
                      <span>{property.square_feet} sq ft</span>
                    </div>
                  )}
                  {property.bedrooms && (
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-muted-foreground" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center gap-2">
                      <Bath className="w-4 h-4 text-muted-foreground" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                  )}
                  {property.year_built && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Built {property.year_built}</span>
                    </div>
                  )}
                </div>

                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {filteredProperties?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No properties found</p>
        </div>
      )}
    </div>
  );
}