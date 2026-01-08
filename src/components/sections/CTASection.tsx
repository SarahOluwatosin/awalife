import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />

      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Get Started
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Elevate Your Diagnostics to the{' '}
            <span className="text-primary">Next Level</span>{' '}
            With Awalife
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Want to learn more about our diagnostic solutions? Adapt, innovate and thrive with more value from every test flowing through your practice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild>
              <Link to="/contact">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-border/50 hover:bg-card" asChild>
              <Link to="/products">
                View Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
