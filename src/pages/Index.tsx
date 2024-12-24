import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { PropertyForm } from "@/components/PropertyForm";

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
            Property Portfolio
          </h1>
          <p className="text-muted-foreground animate-fade-up">
            Analyze and manage your real estate investments
          </p>
        </div>

        <section className="animate-fade-up">
          <AnalyticsDashboard />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Add New Property
            </h2>
          </div>
          <PropertyForm />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Recent Properties
            </h2>
            <Button variant="outline">View All</Button>
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
        </section>
      </main>
    </div>
  );
};

export default Index;