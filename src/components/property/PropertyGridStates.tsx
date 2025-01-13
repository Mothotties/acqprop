import { Loader2 } from "lucide-react";

interface PropertyGridStatesProps {
  isLoading: boolean;
  isEmpty: boolean;
}

export function PropertyGridStates({ isLoading, isEmpty }: PropertyGridStatesProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No properties found matching your criteria</p>
      </div>
    );
  }

  return null;
}