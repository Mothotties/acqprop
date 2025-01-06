import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { PropertyForm } from "@/components/PropertyForm";
import { LocationAnalysis } from "@/components/LocationAnalysis";
import { PropertyMetrics } from "@/components/PropertyMetrics";
import { PropertyEvaluationTools } from "@/components/PropertyEvaluationTools";
import { PortfolioDashboard } from "@/components/PortfolioDashboard";
import { DocumentManager } from "@/components/DocumentManager";
import { MaintenanceTracker } from "@/components/MaintenanceTracker";
import { AIPredictiveAnalytics } from "@/components/AIPredictiveAnalytics";
import { PropertyViewer3D } from "@/components/PropertyViewer3D";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, ChevronRight, Brain, Sparkles, Building, BarChart3, FileText, Tool, MapPin, Calculator } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PropertySearch } from "@/components/PropertySearch";

const sampleProperty = {
  title: "Luxury Apartment Complex",
  price: 2500000,
  type: "Multi-Family",
  location: "Beverly Hills, CA",
  metrics: {
    capRate: 5.8,
    roi: 12.4,
    cashFlow: 25000,
    occupancyRate: 95,
    daysOnMarket: 45,
    appreciationRate: 4.2,
    riskScore: 3,
    marketTrend: "Growing",
  },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <main className="container py-12 space-y-8">
        <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium text-gold-dark bg-gold-light/10 rounded-full animate-fade-in">
            <Sparkles className="w-4 h-4" />
            Next-Generation Real Estate Platform
          </div>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent animate-fade-up">
            <span>AcuProp</span> AI
          </h1>
          <p className="max-w-[42rem] text-lg text-muted-foreground animate-fade-up delay-100">
            The world's first fully integrated, AI-powered real estate ecosystem
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6 animate-fade-up delay-200">
            <Button className="gap-2 bg-gold hover:bg-gold-dark" size="lg">
              <Brain className="w-4 h-4" />
              AI Analysis
            </Button>
            <Button variant="outline" className="gap-2 border-gold/20 hover:bg-gold/5" size="lg">
              Learn More <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 animate-fade-up delay-300">
          <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <AnalyticsDashboard />
          </section>

          <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <PropertyViewer3D />
          </section>

          <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <AIPredictiveAnalytics />
          </section>

          <section className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <PropertyMetrics metrics={sampleProperty.metrics} />
          </section>
        </div>

        <Tabs defaultValue="portfolio" className="w-full animate-fade-up delay-400">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto gap-2 bg-muted/50 p-2">
            <TabsTrigger value="portfolio" className="gap-2">
              <Building className="w-4 h-4" />
              <span className="hidden md:inline">Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              <Brain className="w-4 h-4" />
              <span className="hidden md:inline">AI Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="properties" className="gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden md:inline">Properties</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden md:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="gap-2">
              <Tool className="w-4 h-4" />
              <span className="hidden md:inline">Maintenance</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden md:inline">Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="location" className="gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden md:inline">Location</span>
            </TabsTrigger>
            <TabsTrigger value="evaluation" className="gap-2">
              <Calculator className="w-4 h-4" />
              <span className="hidden md:inline">Evaluation</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="space-y-6 mt-6">
            <PortfolioDashboard />
          </TabsContent>

          <TabsContent value="ai" className="space-y-6 mt-6">
            <AIPredictiveAnalytics />
          </TabsContent>

          <TabsContent value="properties" className="space-y-6 mt-6">
            <div className="space-y-8">
              <PropertySearch onSearch={() => {}} onFilterChange={() => {}} />
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Premium Properties
                </h2>
                <Button variant="outline" className="gap-2 border-gold/20 hover:bg-gold/5">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <PropertyCard {...sampleProperty} />
                <PropertyCard
                  {...sampleProperty}
                  title="Downtown Office Building"
                  price={4800000}
                  type="Commercial"
                />
                <PropertyCard
                  {...sampleProperty}
                  title="Retail Plaza"
                  price={3200000}
                  type="Retail"
                />
              </div>

              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold tracking-tight mb-6">
                    Add New Property
                  </h2>
                  <PropertyForm />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6 mt-6">
            <DocumentManager />
          </TabsContent>
          
          <TabsContent value="maintenance" className="space-y-6 mt-6">
            <MaintenanceTracker />
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-6 mt-6">
            <LocationAnalysis />
          </TabsContent>
          
          <TabsContent value="location" className="space-y-6 mt-6">
            <div className="grid gap-4">
              <div className="p-8 rounded-lg border bg-card">
                <h3 className="text-2xl font-semibold mb-6">Location Score: 85/100</h3>
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="p-6 rounded-lg border bg-card/50">
                      <h4 className="text-lg font-medium mb-3">Neighborhood Rating</h4>
                      <p className="text-3xl font-bold text-gold">A+</p>
                    </div>
                    <div className="p-6 rounded-lg border bg-card/50">
                      <h4 className="text-lg font-medium mb-3">School District</h4>
                      <p className="text-3xl font-bold text-gold">9/10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="evaluation" className="space-y-6 mt-6">
            <PropertyEvaluationTools />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;