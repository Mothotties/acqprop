import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

interface PropertyFormData {
  propertyName: string;
  propertyType: string;
  price: string;
  location: string;
  squareFeet: string;
  yearBuilt: string;
}

export function PropertyForm() {
  const { toast } = useToast();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>({
    propertyName: "",
    propertyType: "",
    price: "",
    location: "",
    squareFeet: "",
    yearBuilt: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      propertyType: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate all fields are filled
    if (!Object.values(formData).every(value => value)) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Insert the property into the database
      const { error } = await supabase
        .from('properties')
        .insert({
          title: formData.propertyName,
          property_type: formData.propertyType,
          price: parseFloat(formData.price),
          location: formData.location,
          square_feet: parseFloat(formData.squareFeet),
          year_built: parseInt(formData.yearBuilt),
          owner_id: session?.user?.id,
        });

      if (error) throw error;

      toast({
        title: "Property Added",
        description: "The property has been successfully added to your portfolio.",
      });
      
      // Reset form after successful submission
      setFormData({
        propertyName: "",
        propertyType: "",
        price: "",
        location: "",
        squareFeet: "",
        yearBuilt: "",
      });
    } catch (error) {
      console.error('Error adding property:', error);
      toast({
        title: "Error",
        description: "Failed to add property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="propertyName">Property Name</Label>
              <Input
                id="propertyName"
                placeholder="Enter property name"
                value={formData.propertyName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                value={formData.propertyType}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Single Family</SelectItem>
                  <SelectItem value="multi-family">Multi-Family</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Purchase Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter purchase price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter property location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="squareFeet">Square Feet</Label>
              <Input
                id="squareFeet"
                type="number"
                placeholder="Enter square footage"
                value={formData.squareFeet}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearBuilt">Year Built</Label>
              <Input
                id="yearBuilt"
                type="number"
                placeholder="Enter year built"
                value={formData.yearBuilt}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Adding Property..." : "Add Property"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}