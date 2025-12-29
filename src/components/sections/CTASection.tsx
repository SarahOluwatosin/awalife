import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.cta.title}
            <br />
            <span className="gradient-text">{t.cta.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            {t.cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild>
              <Link to="/contact">
                {t.cta.button}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-border/50 hover:bg-card" asChild>
              <Link to="/contact?type=distributor">
                <Users className="mr-2 w-4 h-4" />
                {t.cta.distributorButton}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
