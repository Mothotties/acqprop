import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { PropertyFormFields } from "./property/PropertyFormFields";

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
          <PropertyFormFields
            formData={formData}
            handleInputChange={handleInputChange}
            handleTypeChange={handleTypeChange}
          />
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Adding Property..." : "Add Property"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}