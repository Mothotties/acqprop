import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface PropertyHeaderProps {
  title: string;
  location: string;
  price: number;
}

export function PropertyHeader({ title, location, price }: PropertyHeaderProps) {
  return (
    <div className="flex items-center justify-between animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {location}
        </p>
      </div>
      <Badge variant="secondary" className="text-lg">
        ${price.toLocaleString()}
      </Badge>
    </div>
  );
}