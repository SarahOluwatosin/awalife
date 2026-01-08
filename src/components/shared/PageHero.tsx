import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageHeroProps {
  title: string;
  subtitle: string;
  breadcrumb?: { label: string; path: string }[];
  children?: ReactNode;
}

const PageHero = ({ title, subtitle, breadcrumb, children }: PageHeroProps) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 orb opacity-20" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 orb opacity-15" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        {breadcrumb && (
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 opacity-0 animate-fade-in">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                {i === breadcrumb.length - 1 ? (
                  <span className="text-foreground">{item.label}</span>
                ) : (
                  <Link to={item.path} className="hover:text-primary transition-colors">{item.label}</Link>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 opacity-0 animate-fade-in delay-100">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground opacity-0 animate-fade-in delay-200">
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
