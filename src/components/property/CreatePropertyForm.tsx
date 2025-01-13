import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PropertyFormFields } from "./PropertyFormFields";
import { usePropertyForm } from "@/hooks/usePropertyForm";

export function CreatePropertyForm() {
  const { form, onSubmit } = usePropertyForm();

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