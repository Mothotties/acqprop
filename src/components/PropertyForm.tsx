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

export function PropertyForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Property Added",
        description: "The property has been successfully added to your portfolio.",
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="propertyName">Property Name</Label>
          <Input
            id="propertyName"
            placeholder="Enter property name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="propertyType">Property Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
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
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Enter property location"
            required
          />
        </div>
      </div>
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Adding Property..." : "Add Property"}
      </Button>
    </form>
  );
}