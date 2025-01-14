import { Brain, Building2, FileText, Wrench, BarChart3, Calculator, Building } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function NavigationTabs() {
  return (
    <TabsList className="relative grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 h-auto gap-2 bg-background/50 p-2 rounded-lg shadow-sm">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-ai/5 rounded-lg opacity-30" />
      
      <TabsTrigger 
        value="portfolio" 
        className="relative z-10 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-foreground shadow-none"
      >
        <Building className="w-4 h-4" />
        <span className="hidden md:inline">Portfolio</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="ai" 
        className="relative z-10 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-foreground shadow-none"
      >
        <Brain className="w-4 h-4" />
        <span className="hidden md:inline">AI Analysis</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="properties" 
        className="relative z-10 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-foreground shadow-none"
      >
        <Building2 className="w-4 h-4" />
        <span className="hidden md:inline">Properties</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="documents" 
        className="relative z-10 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-foreground shadow-none"
      >
        <FileText className="w-4 h-4" />
        <span className="hidden md:inline">Documents</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="maintenance" 
        className="relative z-10 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-foreground shadow-none"
      >
        <Wrench className="w-4 h-4" />
        <span className="hidden md:inline">Maintenance</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="analysis" 
        className="relative z-10 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-foreground shadow-none"
      >
        <BarChart3 className="w-4 h-4" />
        <span className="hidden md:inline">Analysis</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="evaluation" 
        className="relative z-10 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-foreground shadow-none"
      >
        <Calculator className="w-4 h-4" />
        <span className="hidden md:inline">Evaluation</span>
      </TabsTrigger>
    </TabsList>
  );
}