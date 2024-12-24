import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { PropertyForm } from "@/components/PropertyForm";
import { LocationAnalysis } from "@/components/LocationAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const sampleProperty = {
    title: "Luxury Apartment Complex",
    price: 2500000,
    type: "Multi-Family",
    location: "Beverly Hills, CA",
    metrics: {
      capRate: 5.8,
      roi: 12.4,
      cashFlow: 25000,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight animate-fade-up">
            Property Value Ninja
          </h1>
          <p className="text-muted-foreground animate-fade-up">
            Advanced property analysis for sophisticated investors
          </p>
        </div>

        <section className="animate-fade-up">
          <AnalyticsDashboard />
        </section>

        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">
                Add New Property
              </h2>
            </div>
            <PropertyForm />
            
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Recent Properties
                </h2>
                <Button variant="outline">View All</Button>
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
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-4">
            <LocationAnalysis />
          </TabsContent>
          
          <TabsContent value="location" className="space-y-4">
            <div className="grid gap-4">
              <div className="p-6 border rounded-lg">
                <h3 className="mb-4 text-xl font-semibold">Location Score: 85/100</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="mb-2 font-medium">Neighborhood Rating</h4>
                      <p className="text-2xl font-bold text-gold">A+</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="mb-2 font-medium">School District</h4>
                      <p className="text-2xl font-bold text-gold">9/10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;