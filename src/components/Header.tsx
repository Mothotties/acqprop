import { Brain, ChevronRight, Search, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function Header() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAISearch = () => {
    toast({
      title: "AI Search Assistant",
      description: "Processing your search with AI assistance...",
    });
    // AI search logic will be implemented here
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-gold-dark/5 blur-3xl" />
      
      {/* Navigation Bar */}
      <nav className="relative flex items-center justify-between px-6 py-4 border-b border-gold/10">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-serif font-bold tracking-tight">
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              AcqProp
            </span>
          </h1>
          
          {/* AI-powered Search Bar */}
          <div className="relative hidden md:flex items-center max-w-md flex-1">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9 bg-background/50 border-gold/20 focus:border-gold/40"
              placeholder="Search properties with AI assistance..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-primary hover:bg-gold/5"
          >
            <User className="h-5 w-5" />
          </Button>
          <Button 
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark hover:opacity-90"
          >
            <Brain className="w-4 h-4" />
            Start Investing
          </Button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="relative space-y-4 text-center md:text-left max-w-4xl mx-auto px-6 py-16">
        <div 
          className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-4 
                     text-sm font-medium text-gold-dark bg-gradient-to-r from-gold-light/20 to-gold/10 
                     rounded-full animate-fade-in backdrop-blur-sm border border-gold/10"
        >
          <Sparkles className="w-4 h-4" />
          Next-Generation Real Estate Platform
        </div>
        
        <h2 className="text-4xl font-serif font-bold tracking-tight lg:text-5xl xl:text-6xl animate-fade-up">
          Discover Your Next
          <span className="block text-gold">Investment Opportunity</span>
        </h2>
        
        <p className="max-w-[42rem] text-lg text-muted-foreground animate-fade-up delay-100">
          The world's first fully integrated, AI-powered real estate ecosystem that revolutionizes property investment
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-8 animate-fade-up delay-200">
          <Button 
            className="gap-2 bg-gradient-to-r from-gold to-gold-dark hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-gold/25"
            size="lg"
          >
            <Brain className="w-4 h-4" />
            Explore Properties
          </Button>
          <Button 
            variant="outline" 
            className="gap-2 border-gold/20 hover:bg-gold/5 transition-all duration-300"
            size="lg"
          >
            Learn More <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}