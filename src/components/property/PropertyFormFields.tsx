import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyFormFieldsProps {
  formData: {
    propertyName: string;
    propertyType: string;
    price: string;
    location: string;
    squareFeet: string;
    yearBuilt: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTypeChange: (value: string) => void;
}

export function PropertyFormFields({
  formData,
  handleInputChange,
  handleTypeChange,
}: PropertyFormFieldsProps) {
  return (
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
  );
}