import { Brain, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
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
  );
}