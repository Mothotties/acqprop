import { Brain, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-gold-dark/5 blur-3xl" />
      
      <div className="relative space-y-4 text-center md:text-left max-w-4xl mx-auto px-4">
        <div 
          className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-4 
                     text-sm font-medium text-gold-dark bg-gradient-to-r from-gold-light/20 to-gold/10 
                     rounded-full animate-fade-in backdrop-blur-sm border border-gold/10"
        >
          <Sparkles className="w-4 h-4" />
          Next-Generation Real Estate Platform
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl animate-fade-up">
          <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
            AcuProp
          </span>
          <span className="bg-gradient-to-r from-ai to-ai-dark bg-clip-text text-transparent ml-2">
            AI
          </span>
        </h1>
        
        <p className="max-w-[42rem] text-lg text-muted-foreground animate-fade-up delay-100">
          The world's first fully integrated, AI-powered real estate ecosystem
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6 animate-fade-up delay-200">
          <Button 
            className="gap-2 bg-gradient-to-r from-gold to-gold-dark hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-gold/25"
            size="lg"
          >
            <Brain className="w-4 h-4" />
            AI Analysis
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