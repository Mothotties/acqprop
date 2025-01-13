import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  disabled?: boolean;
}

export function PriceRangeFilter({ value, onChange, disabled }: PriceRangeFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px]" disabled={disabled}>
          <DollarSign className="w-4 h-4 mr-2" />
          ${value[0].toLocaleString()} - ${value[1].toLocaleString()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4 p-4">
          <h4 className="font-medium">Price Range</h4>
          <div className="space-y-2">
            <Slider
              value={value}
              max={5000000}
              step={50000}
              className="w-full"
              onValueChange={(value) => onChange(value as [number, number])}
              disabled={disabled}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>$0</span>
              <span>$5M+</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}