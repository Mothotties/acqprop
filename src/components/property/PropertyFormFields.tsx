import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertyFormData {
  propertyName: string;
  propertyType: string;
  price: string;
  location: string;
  squareFeet: string;
  yearBuilt: string;
}

interface PropertyFormFieldsProps {
  formData: PropertyFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTypeChange: (value: string) => void;
}

export function PropertyFormFields({ formData, handleInputChange, handleTypeChange }: PropertyFormFieldsProps) {
  return (
    <>
      <FormItem>
        <FormLabel>Property Name</FormLabel>
        <FormControl>
          <Input
            id="propertyName"
            placeholder="Enter property name"
            value={formData.propertyName}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel>Property Type</FormLabel>
        <Select onValueChange={handleTypeChange} value={formData.propertyType}>
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

      <FormItem>
        <FormLabel>Price</FormLabel>
        <FormControl>
          <Input
            id="price"
            type="number"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel>Location</FormLabel>
        <FormControl>
          <Input
            id="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel>Square Feet</FormLabel>
        <FormControl>
          <Input
            id="squareFeet"
            type="number"
            placeholder="Enter square feet"
            value={formData.squareFeet}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel>Year Built</FormLabel>
        <FormControl>
          <Input
            id="yearBuilt"
            type="number"
            placeholder="Enter year built"
            value={formData.yearBuilt}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
}