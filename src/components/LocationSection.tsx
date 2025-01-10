import { MapPin, Building, School } from "lucide-react";

export function LocationSection() {
  return (
    <div className="grid gap-4">
      <div className="p-8 rounded-lg border bg-card">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-6 h-6 text-gold" />
          <h3 className="text-2xl font-semibold">Location Score: 85/100</h3>
        </div>
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 rounded-lg border bg-card/50">
              <div className="flex items-center gap-2 mb-3">
                <Building className="w-5 h-5 text-gold" />
                <h4 className="text-lg font-medium">Neighborhood Rating</h4>
              </div>
              <p className="text-3xl font-bold text-gold">A+</p>
              <p className="text-sm text-muted-foreground mt-2">
                Based on safety, amenities, and property values
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card/50">
              <div className="flex items-center gap-2 mb-3">
                <School className="w-5 h-5 text-gold" />
                <h4 className="text-lg font-medium">School District</h4>
              </div>
              <p className="text-3xl font-bold text-gold">9/10</p>
              <p className="text-sm text-muted-foreground mt-2">
                Top-rated schools in the area
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}