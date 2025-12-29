import { ArrowRight, ChevronDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';
import ai100vet from '@/assets/ai-100vet.png';
import microscopeStation from '@/assets/microscope-station.png';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="Laboratory environment" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 opacity-0 animate-fade-in">
              <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">{t.hero.badge}</span>
              {t.hero.badgeText}
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fade-in delay-100">
              <span className="text-foreground">{t.hero.tagline}</span>
              <br />
              <span className="gradient-text">{t.hero.taglineHighlight}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 opacity-0 animate-fade-in delay-200">
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 opacity-0 animate-fade-in delay-300">
              <Button size="lg" className="btn-gradient group" asChild>
                <Link to="/contact">
                  {t.hero.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border/50 hover:bg-card/50">
                <Download className="mr-2 w-4 h-4" />
                {t.hero.ctaSecondary}
              </Button>
            </div>

            {/* Disclaimer */}
            <p className="text-muted-foreground text-xs opacity-0 animate-fade-in delay-400">
              {t.hero.disclaimer}
            </p>
          </div>

          {/* Right Column - Product Images */}
          <div className="relative hidden lg:block opacity-0 animate-fade-in delay-300">
            <div className="relative">
              {/* Main product image */}
              <img 
                src={ai100vet} 
                alt="AI-100Vet Morphology Analyzer" 
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
              {/* Secondary product image */}
              <img 
                src={microscopeStation} 
                alt="Digital Microscope Station" 
                className="absolute -bottom-8 -right-8 w-48 drop-shadow-xl"
              />
            </div>
          </div>
        </div>
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
