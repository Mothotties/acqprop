import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

interface AnalyticsFiltersProps {
  propertyType?: string;
  dateRange: DateRange;
  onPropertyTypeChange: (value: string) => void;
  onDateRangeChange: (date: DateRange) => void;
}

export function AnalyticsFilters({
  propertyType,
  dateRange,
  onPropertyTypeChange,
  onDateRangeChange
}: AnalyticsFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <Select onValueChange={onPropertyTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Property Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="residential">Residential</SelectItem>
          <SelectItem value="commercial">Commercial</SelectItem>
          <SelectItem value="industrial">Industrial</SelectItem>
        </SelectContent>
      </Select>
      <DatePickerWithRange date={dateRange} setDate={onDateRangeChange} />
    </div>
  );
}