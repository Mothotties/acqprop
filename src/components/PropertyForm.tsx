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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!Object.values(formData).every(value => value)) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    console.log("Submitting property data:", formData);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Property Added",
        description: "The property has been successfully added to your portfolio.",
      });
      
      setFormData({
        propertyName: "",
        propertyType: "",
        price: "",
        location: "",
        squareFeet: "",
        yearBuilt: "",
      });
    }, 1500);
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
                onValueChange={handleTypeChange}
                value={formData.propertyType}
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