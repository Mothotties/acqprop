import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

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

const properties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    price: 750000,
    address: "123 Main St, Downtown, CA 90210",
    squareFeet: 1200,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    yearBuilt: 2020,
    type: "Apartment",
    status: "For Sale",
    appreciation: 5.2,
  },
  {
    id: "2",
    title: "Luxury Beach House",
    price: 2500000,
    address: "456 Ocean Ave, Beach City, CA 90211",
    squareFeet: 3500,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    yearBuilt: 2018,
    type: "House",
    status: "For Sale",
    appreciation: 7.8,
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

export function PropertyListingView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Featured Properties</h2>
        <Badge variant="outline" className="text-sm">
          {properties.length} Properties
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{property.title}</CardTitle>
                <Badge
                  variant={
                    property.status === "For Sale"
                      ? "default"
                      : property.status === "Sold"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {property.status}
                </Badge>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {property.address}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-primary">
                {formatPrice(property.price)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-muted-foreground" />
                  <span>{property.squareFeet} sq ft</span>
                </div>
                <div className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-muted-foreground" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-muted-foreground" />
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-muted-foreground" />
                  <span>{property.parking} Parking</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Built {property.yearBuilt}</span>
                </div>
                <div className="flex items-center gap-2 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{property.appreciation}% Appreciation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}