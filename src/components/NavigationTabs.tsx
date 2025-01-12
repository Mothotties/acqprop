import { Brain, Building, Building2, FileText, Wrench, BarChart3, MapPin, Calculator } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function NavigationTabs() {
  return (
    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto gap-2 bg-muted/50 p-2">
      <TabsTrigger value="portfolio" className="gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground">
        <Building className="w-4 h-4" />
        <span className="hidden md:inline">Portfolio</span>
      </TabsTrigger>
      <TabsTrigger value="ai" className="gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground">
        <Brain className="w-4 h-4" />
        <span className="hidden md:inline">AI Analysis</span>
      </TabsTrigger>
      <TabsTrigger value="properties" className="gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground">
        <Building2 className="w-4 h-4" />
        <span className="hidden md:inline">Properties</span>
      </TabsTrigger>
      <TabsTrigger value="documents" className="gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground">
        <FileText className="w-4 h-4" />
        <span className="hidden md:inline">Documents</span>
      </TabsTrigger>
      <TabsTrigger value="maintenance" className="gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground">
        <Wrench className="w-4 h-4" />
        <span className="hidden md:inline">Maintenance</span>
      </TabsTrigger>
      <TabsTrigger value="analysis" className="gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground">
        <BarChart3 className="w-4 h-4" />
        <span className="hidden md:inline">Analysis</span>
      </TabsTrigger>
      <TabsTrigger value="location" className="gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground">
        <MapPin className="w-4 h-4" />
        <span className="hidden md:inline">Location</span>
      </TabsTrigger>
      <TabsTrigger value="evaluation" className="gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground">
        <Calculator className="w-4 h-4" />
        <span className="hidden md:inline">Evaluation</span>
      </TabsTrigger>
    </TabsList>
  );
}