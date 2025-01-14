import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface InvestmentPreferencesProps {
  preferences: {
    propertyTypes: string[];
    priceRange: {
      min: number;
      max: number;
    };
    locations: string[];
  };
  onUpdate: (preferences: {
    propertyTypes: string[];
    priceRange: { min: number; max: number };
    locations: string[];
  }) => void;
}

export function InvestmentPreferences({ preferences, onUpdate }: InvestmentPreferencesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Preferences</CardTitle>
        <CardDescription>Customize your investment preferences to get personalized recommendations.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Property Types</Label>
          {/* Property type selection UI will be implemented in the next iteration */}
        </div>

        <div className="space-y-2">
          <Label>Price Range</Label>
          {/* Price range slider will be implemented in the next iteration */}
        </div>

        <div className="space-y-2">
          <Label>Preferred Locations</Label>
          {/* Location selection UI will be implemented in the next iteration */}
        </div>
      </CardContent>
    </Card>
  );
}