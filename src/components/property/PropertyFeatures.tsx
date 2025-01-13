import { BedDouble, Bath, Ruler, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyFeaturesProps {
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  yearBuilt?: number;
  description?: string;
}

export function PropertyFeatures({
  bedrooms,
  bathrooms,
  squareFeet,
  yearBuilt,
  description,
}: PropertyFeaturesProps) {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {bedrooms && (
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-muted-foreground" />
              <span>{bedrooms} Bedrooms</span>
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-muted-foreground" />
              <span>{bathrooms} Bathrooms</span>
            </div>
          )}
          {squareFeet && (
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-muted-foreground" />
              <span>{squareFeet} sq ft</span>
            </div>
          )}
          {yearBuilt && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Built {yearBuilt}</span>
            </div>
          )}
        </div>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}