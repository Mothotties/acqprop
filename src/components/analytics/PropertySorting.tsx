import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export type SortOption = {
  field: string;
  direction: 'asc' | 'desc';
};

interface PropertySortingProps {
  onSortChange: (sort: SortOption) => void;
}

export function PropertySorting({ onSortChange }: PropertySortingProps) {
  const handleSortChange = (value: string) => {
    const [field, direction] = value.split('-');
    onSortChange({ field, direction: direction as 'asc' | 'desc' });
  };

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
      <Select onValueChange={handleSortChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort properties" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-asc">Price (Low to High)</SelectItem>
          <SelectItem value="price-desc">Price (High to Low)</SelectItem>
          <SelectItem value="ai_confidence_score-desc">AI Score (Highest)</SelectItem>
          <SelectItem value="roi-desc">ROI (Highest)</SelectItem>
          <SelectItem value="risk_score-asc">Risk Score (Lowest)</SelectItem>
          <SelectItem value="created_at-desc">Newest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}