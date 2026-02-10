interface PageHeroProps {
  title: string;
  subtitle: string;
  breadcrumb?: { label: string; path: string }[];
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className="pt-28 pb-12 bg-secondary/10">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;
