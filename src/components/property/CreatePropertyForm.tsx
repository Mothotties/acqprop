import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PropertyFormFields, PropertyFormData } from "./PropertyFormFields";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import { UseFormReturn } from "react-hook-form";

export function CreatePropertyForm() {
  const { form, onSubmit } = usePropertyForm() as { 
    form: UseFormReturn<PropertyFormData>, 
    onSubmit: (data: PropertyFormData) => void 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PropertyFormFields form={form} />
        <Button type="submit" className="w-full">
          Create Property Listing
        </Button>
      </form>
    </Form>
  );
}