import { Brain, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { AnalyticsFilters } from "./AnalyticsFilters";

interface AnalyticsHeaderProps {
  propertyType?: string;
  dateRange: DateRange;
  onPropertyTypeChange: (value: string) => void;
  onDateRangeChange: (date: DateRange) => void;
  onExport: () => void;
}

export function AnalyticsHeader({
  propertyType,
  dateRange,
  onPropertyTypeChange,
  onDateRangeChange,
  onExport,
}: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Property Analytics</h2>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Download className="w-4 h-4" />
          Export Data
        </Button>
        <AnalyticsFilters
          propertyType={propertyType}
          dateRange={dateRange}
          onPropertyTypeChange={onPropertyTypeChange}
          onDateRangeChange={onDateRangeChange}
        />
      </div>
    </div>
  );
}