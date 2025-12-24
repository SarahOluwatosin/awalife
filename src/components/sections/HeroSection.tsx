import { Play, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="AWALIFE Lab" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 orb opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 orb opacity-30" style={{ animationDelay: '3s' }} />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
        {/* Badge - Hidden on mobile for cleaner look */}
        <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 opacity-0 animate-fade-in">
          <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">{t.hero.badge}</span>
          {t.hero.badgeText}
          <ArrowRight className="w-4 h-4" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in delay-100">
          <span className="text-foreground">{t.hero.tagline}</span>
          <br />
          <span className="gradient-text">{t.hero.taglineHighlight}</span>
          <br />
          <span className="text-foreground">{t.hero.taglineEnd}</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in delay-200">
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 opacity-0 animate-fade-in delay-300">
          <Button size="lg" className="btn-gradient group" asChild>
            <Link to="/products">
              {t.hero.cta}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-border/50 hover:bg-card/50">
            <Play className="mr-2 w-4 h-4" />
            {t.hero.ctaSecondary}
          </Button>
        </div>

        {/* Experience badge */}
        <p className="text-muted-foreground text-sm opacity-0 animate-fade-in delay-400">
          5+ {t.hero.experience}
        </p>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-float"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default HeroSection;
