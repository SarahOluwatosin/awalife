import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="AWALIFE Veterinary Diagnostics Lab"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            Since 2020 • 1,065,092+ pets helped
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-card mb-4 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {t.hero.tagline}
          </h1>

          <p
            className="text-xl md:text-2xl text-primary font-medium mb-4 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            {t.hero.subtitle}
          </p>

          <p
            className="text-lg text-card/80 mb-8 max-w-2xl opacity-0 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            {t.hero.description}
          </p>

          <div
            className="flex flex-wrap gap-4 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.7s' }}
          >
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="group bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToContact}
              className="border-card/40 text-card bg-card/10 hover:bg-card/20 hover:text-card backdrop-blur-sm"
            >
              {t.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-card/60 hover:text-card transition-colors animate-float"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default HeroSection;
