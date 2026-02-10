import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-card/50">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Interested in Our Products?
          </h2>
          <p className="text-[18px] text-muted-foreground mb-10">
            Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild>
              <Link to="/contact">
                Contact us
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
