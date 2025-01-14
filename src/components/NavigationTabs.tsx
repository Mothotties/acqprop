import { useNavigate, useLocation } from "react-router-dom";
import { Brain, Building2, FileText, Wrench, BarChart3, Calculator, Home } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function NavigationTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      value: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      value: "properties",
      label: "Properties",
      icon: Building2,
      path: "/properties",
    },
    {
      value: "documents",
      label: "Documents",
      icon: FileText,
      path: "/documents",
    },
    {
      value: "maintenance",
      label: "Maintenance",
      icon: Wrench,
      path: "/maintenance",
    },
    {
      value: "analysis",
      label: "Analysis",
      icon: BarChart3,
      path: "/analysis",
    },
    {
      value: "ai-analysis",
      label: "AI Analysis",
      icon: Brain,
      path: "/ai-analysis",
    },
    {
      value: "evaluation",
      label: "Evaluation",
      icon: Calculator,
      path: "/evaluation",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <TabsList className="relative grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 h-auto gap-2 bg-background/50 p-2 rounded-lg shadow-sm">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-ai/5 rounded-lg opacity-30" />
      
      {navigationItems.map((item) => (
        <TabsTrigger
          key={item.value}
          value={item.value}
          onClick={() => handleNavigation(item.path)}
          className={cn(
            "relative z-10 gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-foreground shadow-none",
            location.pathname === item.path && "bg-white/10"
          )}
        >
          <item.icon className="w-4 h-4" />
          <span className="hidden md:inline">{item.label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}