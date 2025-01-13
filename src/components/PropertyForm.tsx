import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { PropertyFormFields, PropertyFormData, propertyFormSchema } from "./property/PropertyFormFields";
import { generatePropertyAnalytics } from "@/utils/propertyAnalytics";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

export function PropertyForm() {
  const { toast } = useToast();
  const session = useSession();
  const [loading, setLoading] = useState(false);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      location: "",
      property_type: "",
      bedrooms: undefined,
      bathrooms: undefined,
      square_feet: undefined,
      year_built: undefined,
    },
  });

  const onSubmit = async (data: PropertyFormData) => {
    setLoading(true);

    try {
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .insert({
          title: data.title,
          description: data.description,
          price: data.price,
          location: data.location,
          property_type: data.property_type,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          square_feet: data.square_feet,
          year_built: data.year_built,
          owner_id: session?.user?.id,
        })
        .select()
        .single();

      if (propertyError) throw propertyError;

      await generatePropertyAnalytics(propertyData.id, {
        price: data.price,
        location: data.location,
        property_type: data.property_type,
        square_feet: data.square_feet,
        year_built: data.year_built,
      });

      toast({
        title: "Property Added",
        description: "The property has been successfully added to your portfolio with analytics data.",
      });
      
      form.reset();
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-up">
            <PropertyFormFields form={form} />
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Adding Property..." : "Add Property"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}