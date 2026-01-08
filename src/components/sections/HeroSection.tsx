import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import awalHero from '@/assets/awal-hero.webp';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image with fade */}
      <div className="absolute inset-0 z-0">
        <img 
          src={awalHero} 
          alt="" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Feature Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 opacity-0 animate-fade-in">
            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              New Feature
            </span>
            <span className="text-sm text-foreground">
              {t.hero.badge}
            </span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 opacity-0 animate-fade-in delay-100 leading-tight">
            <span className="text-foreground">Changing Your Idea of What</span>
            <br />
            <span className="text-primary">{t.hero.taglineHighlight}</span>
            <br />
            <span className="text-foreground">Can Do.</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 opacity-0 animate-fade-in delay-200 leading-relaxed">
            {t.hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 opacity-0 animate-fade-in delay-300">
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

          {/* Experience indicator */}
          <div className="opacity-0 animate-fade-in delay-400">
            <p className="text-sm text-muted-foreground mb-2">5+ Years of Experience</p>
            <button
              onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
