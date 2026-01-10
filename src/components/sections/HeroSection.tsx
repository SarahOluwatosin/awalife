import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-diagnostic-lab.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Full Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute inset-0 tech-grid opacity-20" />
      </div>
      <div className="absolute -top-24 right-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl animate-pulse-soft pointer-events-none" />
      <div
        className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-pulse-soft pointer-events-none"
        style={{ animationDelay: '1.3s' }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Feature Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 opacity-0 animate-fade-in">
            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              AI-Powered
            </span>
            <span className="text-sm text-foreground">
              Morphological POCT Platform
            </span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fade-in delay-100 leading-tight">
            <span className="text-foreground">Transform Diagnostic </span>
            <br />
            <span className="text-foreground">Workflows </span>
            <span className="gradient-text">the Awalife Way</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 opacity-0 animate-fade-in delay-200 leading-relaxed">
            Pioneering the "AI Morphological POCT Technology Platform," Awalife enables intelligent morphological analysis of various pet samples—including blood, urine, feces, and pleural effusion.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-10 opacity-0 animate-fade-in delay-300">
            <Button size="lg" className="btn-gradient group px-8" asChild>
              <Link to="/products">
                Discover More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-border bg-background/50 hover:bg-card px-8">
              <Play className="mr-2 w-4 h-4" />
              Watch Demo
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-8 opacity-0 animate-fade-in delay-500">
            <button
              onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <span className="text-sm">Explore</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
