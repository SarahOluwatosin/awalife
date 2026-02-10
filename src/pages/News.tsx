import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, FileText, BookOpen, Package, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';
import { RESOURCE_KIND_CONFIG, RESOURCE_PRODUCT_OPTIONS } from '@/data/resources';
import type { ResourceItem } from '@/data/resources';

const SECTION_ICONS: Record<string, typeof FileText> = {
  'how-to': BookOpen,
  'medical': FileText,
  'product': Package,
  'other': MoreHorizontal,
};

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data } = useResourcesCMS();

  const faqMidpoint = Math.ceil(data.faq.items.length / 2);
  const faqColumns = [data.faq.items.slice(0, faqMidpoint), data.faq.items.slice(faqMidpoint)];

  const isExternalLink = (url: string) =>
    /^(https?:)?\/\//i.test(url) || url.startsWith('mailto:') || url.startsWith('tel:');
  const ctaLink = data.cta.buttonUrl?.trim() || '/contact';

  const productLabelMap = RESOURCE_PRODUCT_OPTIONS.reduce<Record<string, string>>((acc, product) => {
    acc[product.id] = product.label;
    return acc;
  }, {});

  const getMediaBadge = (item: ResourceItem) => {
    if (item.mediaType === 'link') return 'LINK';
    const mime = item.mediaMime.toLowerCase();
    if (mime.startsWith('image/')) return 'IMG';
    if (mime.startsWith('video/')) return 'VID';
    if (mime.startsWith('audio/')) return 'AUD';
    if (mime === 'application/pdf') return 'PDF';
    const extension = item.mediaName.split('.').pop();
    if (extension) return extension.slice(0, 4).toUpperCase();
    return 'FILE';
  };

  const renderCard = (item: ResourceItem) => {
    const productLabel = productLabelMap[item.productId] || 'Product';
    const mediaUrl = item.mediaUrl?.trim();
    const hasMedia = Boolean(mediaUrl);
    const actionLabel = item.mediaType === 'link' ? 'View' : 'Download';
    return (
      <div
        key={item.id}
        className="group p-5 rounded-xl border border-border/30 bg-secondary/10 hover:border-primary/20 hover:bg-secondary/20 transition-all duration-300 flex items-start justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <span className="inline-block text-[11px] uppercase tracking-wider text-primary/70 font-semibold mb-2">
            {productLabel}
          </span>
          <h3 className="text-sm font-semibold text-foreground mb-1 leading-snug">{item.title}</h3>
          {item.summary && (
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{item.summary}</p>
          )}
          {hasMedia ? (
            <Button variant="ghost" size="sm" className="h-7 px-0 mt-3 text-primary hover:text-primary" asChild>
              {item.mediaType === 'upload' ? (
                <a href={mediaUrl} download={item.mediaName || 'resource'}>
                  {actionLabel}
                  <Download className="ml-1.5 h-3 w-3" />
                </a>
              ) : isExternalLink(mediaUrl) ? (
                <a href={mediaUrl} target="_blank" rel="noreferrer">
                  {actionLabel}
                  <ArrowRight className="ml-1.5 h-3 w-3" />
                </a>
              ) : (
                <Link to={mediaUrl}>
                  {actionLabel}
                  <ArrowRight className="ml-1.5 h-3 w-3" />
                </Link>
              )}
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground/60 mt-3">No file or link attached.</p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
          <span className="text-[10px] font-bold text-primary/60">{getMediaBadge(item)}</span>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                Resource Center
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {data.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {data.hero.description}
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/8 to-accent/8 rounded-3xl blur-3xl opacity-50" />
              <div className="relative rounded-2xl overflow-hidden border border-border/30 bg-secondary/20 shadow-lg">
                {data.hero.imageUrl ? (
                  <img
                    src={data.hero.imageUrl}
                    alt={data.hero.imageAlt}
                    className="w-full aspect-[4/3] object-cover"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
                    No image set
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Sections */}
      {RESOURCE_KIND_CONFIG.map((section) => {
        const sectionResources = data.resources.filter((resource) => resource.kind === section.id);
        const SectionIcon = SECTION_ICONS[section.id] || FileText;
        return (
          <section
            key={section.id}
            className={`py-16 lg:py-20 ${section.variant === 'muted' ? 'bg-card/50' : ''}`}
          >
            <div className="container mx-auto px-6 lg:px-16 xl:px-24">
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <SectionIcon className="h-4 w-4" />
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  {section.sectionTitle}
                </h2>
              </div>
              {sectionResources.length ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sectionResources.map(renderCard)}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border/40 bg-secondary/5 py-12 text-center">
                  <p className="text-muted-foreground">{section.emptyMessage}</p>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{data.faq.title}</h2>
          </div>
          {data.faq.items.length ? (
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {faqColumns.map((items, index) => (
                <Accordion key={`faq-col-${index}`} type="single" collapsible className="w-full">
                  {items.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-border/30">
                      <AccordionTrigger className="text-left text-foreground hover:text-primary transition-colors">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No FAQs yet.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {data.cta.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {data.cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild>
              {isExternalLink(ctaLink) ? (
                <a href={ctaLink} target="_blank" rel="noreferrer">
                  {data.cta.buttonLabel}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              ) : (
                <Link to={ctaLink}>
                  {data.cta.buttonLabel}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;
