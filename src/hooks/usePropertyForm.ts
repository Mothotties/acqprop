import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Insert"];

const propertyFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "Price is required"),
  location: z.string().min(1, "Location is required"),
  property_type: z.string().min(1, "Property type is required"),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  square_feet: z.coerce.number().optional(),
  year_built: z.coerce.number().optional(),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;

export function usePropertyForm() {
  const { toast } = useToast();
  const session = useSession();
  const navigate = useNavigate();

  const form = useForm<PropertyFormValues>({
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

  const onSubmit = async (data: PropertyFormValues) => {
    if (!session?.user?.id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a property listing.",
        variant: "destructive",
      });
      return;
    }

    try {
      const propertyData = {
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        property_type: data.property_type,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        square_feet: data.square_feet,
        year_built: data.year_built,
        owner_id: session.user.id,
        status: "available" as const,
        amenities: [] as string[],
        images: [] as string[],
      } satisfies Property;

      const { data: property, error } = await supabase
        .from("properties")
        .insert(propertyData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Property created",
        description: "Your property listing has been created successfully.",
      });

      // Generate initial analytics for the property
      await supabase.from("property_analytics").insert([
        {
          property_id: property.id,
          ai_confidence_score: 85,
          risk_score: 3,
          predicted_growth: 5.5,
          market_trend: "Growing",
          cap_rate: 6.2,
          roi: 8.5,
          occupancy_rate: 95,
        },
      ]);

      navigate(`/properties/${property.id}`);
    } catch (error) {
      console.error("Error creating property:", error);
      toast({
        title: "Error",
        description: "Failed to create property listing. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    form,
    onSubmit,
  };
}