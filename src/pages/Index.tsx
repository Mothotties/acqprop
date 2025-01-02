import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { PropertyForm } from "@/components/PropertyForm";
import { LocationAnalysis } from "@/components/LocationAnalysis";
import { PropertyMetrics } from "@/components/PropertyMetrics";
import { PropertyEvaluationTools } from "@/components/PropertyEvaluationTools";
import { PortfolioDashboard } from "@/components/PortfolioDashboard";
import { DocumentManager } from "@/components/DocumentManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

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
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium text-gold-dark bg-gold-light/10 rounded-full">
            <Building2 className="w-4 h-4" />
            Premium Property Analysis
          </div>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl animate-fade-up">
            Property Value <span className="text-gold">Ninja</span>
          </h1>
          <p className="max-w-[42rem] text-lg text-muted-foreground animate-fade-up">
            Sophisticated analysis tools for discerning real estate investors
          </p>
        </div>

        <section className="animate-fade-up">
          <AnalyticsDashboard />
        </section>

        <section className="animate-fade-up">
          <PropertyMetrics metrics={sampleProperty.metrics} />
        </section>

        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-6 h-14">
            <TabsTrigger value="portfolio" className="text-base">Portfolio</TabsTrigger>
            <TabsTrigger value="properties" className="text-base">Properties</TabsTrigger>
            <TabsTrigger value="documents" className="text-base">Documents</TabsTrigger>
            <TabsTrigger value="analysis" className="text-base">Analysis</TabsTrigger>
            <TabsTrigger value="location" className="text-base">Location</TabsTrigger>
            <TabsTrigger value="evaluation" className="text-base">Evaluation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="space-y-6">
            <PortfolioDashboard />
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Premium Properties
                </h2>
                <Button variant="outline" className="gap-2">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
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
            </div>

            <div className="p-8 mt-8 border rounded-lg bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                Add New Property
              </h2>
              <PropertyForm />
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <DocumentManager />
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-6 pt-6">
            <LocationAnalysis />
          </TabsContent>
          
          <TabsContent value="location" className="space-y-6 pt-6">
            <div className="grid gap-4">
              <div className="p-8 border rounded-lg bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                <h3 className="mb-6 text-2xl font-semibold">Location Score: 85/100</h3>
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="p-6 border rounded-lg">
                      <h4 className="mb-3 text-lg font-medium">Neighborhood Rating</h4>
                      <p className="text-3xl font-bold text-gold">A+</p>
                    </div>
                    <div className="p-6 border rounded-lg">
                      <h4 className="mb-3 text-lg font-medium">School District</h4>
                      <p className="text-3xl font-bold text-gold">9/10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="evaluation" className="space-y-6 pt-6">
            <PropertyEvaluationTools />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
