interface PageHeroProps {
  title: string;
  subtitle: string;
  breadcrumb?: { label: string; path: string }[];
}

const PageHero = ({ title, subtitle, breadcrumb }: PageHeroProps) => {
  return (
    <section className="pt-28 pb-12 bg-secondary/10">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            {breadcrumb.map((item, i) => (
              <span key={item.path}>
                {i > 0 && <span className="mx-1">/</span>}
                <a href={item.path} className="hover:text-primary transition-colors">{item.label}</a>
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;
