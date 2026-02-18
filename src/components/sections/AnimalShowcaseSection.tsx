import { useId } from 'react';
import { Sparkles } from 'lucide-react';
import { useScrollAnimation, useParallax } from '@/hooks/use-scroll-animation';

const animals = [
  {
    name: 'Canine Intelligence',
    tag: 'Canine morphology',
    description: 'Pattern recognition tuned for fast, high-accuracy canine blood analysis.',
    type: 'dog'
  },
  {
    name: 'Feline Precision',
    tag: 'Feline morphology',
    description: 'Adaptive models for subtle feline cell signatures and clean differentials.',
    type: 'cat'
  },
  {
    name: 'Avian Clarity',
    tag: 'Avian morphology',
    description: 'High-resolution scans that surface rare avian cell anomalies quickly.',
    type: 'bird'
  }
] as const;

const AnimalIcon = ({ type, gradientId }: { type: typeof animals[number]['type']; gradientId: string }) => {
  const strokeProps = {
    fill: 'none',
    stroke: `url(#${gradientId})`,
    strokeWidth: 2.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const
  };

  if (type === 'cat') {
    return (
      <svg viewBox="0 0 120 120" className="h-24 w-24 text-primary">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <path d="M36 44 L26 20 L48 32" {...strokeProps} />
        <path d="M84 44 L94 20 L72 32" {...strokeProps} />
        <circle cx="60" cy="64" r="28" {...strokeProps} />
        <circle cx="50" cy="60" r="2.8" {...strokeProps} />
        <circle cx="70" cy="60" r="2.8" {...strokeProps} />
        <path d="M56 72 Q60 76 64 72" {...strokeProps} />
      </svg>
    );
  }

  if (type === 'bird') {
    return (
      <svg viewBox="0 0 120 120" className="h-24 w-24 text-primary">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <circle cx="52" cy="44" r="16" {...strokeProps} />
        <path d="M36 70 Q60 56 84 70 Q70 90 46 90 Z" {...strokeProps} />
        <path d="M68 44 L88 50 L68 56" {...strokeProps} />
        <circle cx="48" cy="42" r="2.2" {...strokeProps} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24 text-primary">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      <rect x="32" y="36" width="56" height="60" rx="22" {...strokeProps} />
      <path d="M32 48 Q18 58 26 76" {...strokeProps} />
      <path d="M88 48 Q102 58 94 76" {...strokeProps} />
      <circle cx="50" cy="64" r="2.6" {...strokeProps} />
      <circle cx="70" cy="64" r="2.6" {...strokeProps} />
      <path d="M58 76 Q60 80 62 76" {...strokeProps} />
    </svg>
  );
};

const AnimalShowcaseSection = () => {
  const [sectionRef, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [orbRef, orbOffset] = useParallax(0.15);
  const baseId = useId().replace(/:/g, '');

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative">
        <div className="grid lg:grid-cols-[1.1fr_1.9fr] gap-12 items-center">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Sparkles className="h-4 w-4" />
              Animal Intelligence
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
              High-tech insights for every species.
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg">
              Proprietary animal models highlight subtle morphology shifts with holographic clarity and
              smooth, real-time motion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {animals.map((animal, index) => (
              <div
                key={animal.name}
                className={`group relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm transition-all duration-700 hover:-translate-y-1 hover:border-primary/40 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="absolute inset-0 scanlines opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
                <div className="absolute -top-16 left-0 right-0 h-24 scanline-sweep opacity-0 group-hover:opacity-100" />

                <div className="relative flex items-center justify-center rounded-2xl bg-background/70 border border-border/60 p-6 mb-6">
                  <div
                    className="relative animate-float transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-2"
                    style={{ animationDelay: `${index * 0.6}s` }}
                  >
                    <AnimalIcon type={animal.type} gradientId={`${baseId}-animal-${index}`} />
                  </div>
                </div>

                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">{animal.tag}</p>
                <h3 className="text-lg font-semibold mb-2">{animal.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{animal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimalShowcaseSection;
