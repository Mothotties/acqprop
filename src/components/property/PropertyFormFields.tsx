import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

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

export type PropertyFormData = z.infer<typeof propertyFormSchema>;

export interface PropertyFormFieldsProps {
  form: UseFormReturn<PropertyFormData>;
}

export function PropertyFormFields({ form }: PropertyFormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter property name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="property_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter price" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="Enter location" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="square_feet"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Square Feet</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter square feet" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="year_built"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year Built</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter year built" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}