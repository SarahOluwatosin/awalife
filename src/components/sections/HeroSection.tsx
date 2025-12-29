import { ArrowRight, ChevronDown, Download, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import ai100vet from '@/assets/ai-100vet-hero.webp';
import awalifeLogo from '@/assets/awalife-logo.webp';

const HeroSection = () => {
  const { t } = useLanguage();

  const floatingTags = [
    { label: 'AI-Powered', position: 'top-8 -left-4' },
    { label: '10+ Species', position: 'top-24 -right-8' },
    { label: '4 Sample Types', position: 'bottom-32 -left-8' },
    { label: 'Auto Reports', position: 'bottom-16 -right-4' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-8 lg:px-24 xl:px-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text */}
          <div className="text-left">
            {/* Logo */}
            <img src={awalifeLogo} alt="Awalife" className="h-12 mb-6 opacity-0 animate-fade-in" />

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 opacity-0 animate-fade-in delay-100 leading-tight">
              <span className="text-foreground">{t.hero.tagline}</span>
              {' '}
              <span className="gradient-text">{t.hero.taglineHighlight}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 opacity-0 animate-fade-in delay-200 leading-relaxed">
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10 opacity-0 animate-fade-in delay-300">
              <Button size="lg" className="btn-gradient group" asChild>
                <Link to="/contact">
                  {t.hero.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-card">
                <Download className="mr-2 w-4 h-4" />
                {t.hero.ctaSecondary}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 opacity-0 animate-fade-in delay-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">ISO 13485</div>
                  <div className="text-xs text-muted-foreground">Certified Quality</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">500+</div>
                  <div className="text-xs text-muted-foreground">Active Installations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Image */}
          <div className="relative hidden lg:flex items-center justify-center opacity-0 animate-fade-in delay-200">
            {/* Animated glow effect */}
            <div className="absolute w-80 h-80 rounded-full bg-primary/20 blur-3xl animate-pulse" />
            
            {/* Container */}
            <div className="relative w-[360px] h-[360px] rounded-[40px] bg-gradient-to-br from-card to-secondary/30 border border-border/40 backdrop-blur-sm flex items-center justify-center shadow-xl">
              {/* Inner glow */}
              <div className="absolute inset-4 rounded-[32px] bg-gradient-to-br from-primary/5 to-transparent" />
              
              <img 
                src={ai100vet} 
                alt="AI-100Vet Morphology Analyzer" 
                className="relative w-64 drop-shadow-xl z-10"
              />

              {/* Floating Tags */}
              {floatingTags.map((tag, i) => (
                <div
                  key={tag.label}
                  className={`absolute ${tag.position} px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 shadow-lg text-xs font-medium text-foreground animate-float z-20`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  {tag.label}
                </div>
              ))}
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

      {/* Disclaimer */}
      <p className="absolute bottom-20 left-8 lg:left-24 xl:left-32 text-muted-foreground text-xs opacity-0 animate-fade-in delay-500">
        {t.hero.disclaimer}
      </p>
    </section>
  );
};

export default HeroSection;