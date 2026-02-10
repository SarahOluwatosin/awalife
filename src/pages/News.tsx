import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';
import { RESOURCE_KIND_CONFIG, RESOURCE_PRODUCT_OPTIONS } from '@/data/resources';
import type { ResourceItem } from '@/data/resources';

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bodyTextClass = 'text-[18px]';
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
    if (item.mediaType === 'link') {
      return 'LINK';
    }
    const mime = item.mediaMime.toLowerCase();
    if (mime.startsWith('image/')) {
      return 'IMG';
    }
    if (mime.startsWith('video/')) {
      return 'VID';
    }
    if (mime.startsWith('audio/')) {
      return 'AUD';
    }
    if (mime === 'application/pdf') {
      return 'PDF';
    }
    const extension = item.mediaName.split('.').pop();
    if (extension) {
      return extension.slice(0, 4).toUpperCase();
    }
    return 'FILE';
  };

  const renderCard = (item: ResourceItem) => {
    const productLabel = productLabelMap[item.productId] || 'Product';
    const mediaUrl = item.mediaUrl?.trim();
    const hasMedia = Boolean(mediaUrl);
    const actionLabel = item.mediaType === 'link' ? 'View' : 'Download';
    return (
      <div key={item.id} className="glow-card p-4 flex items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center text-[11px] uppercase tracking-wide text-muted-foreground mb-2">
            {productLabel}
          </span>
          <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
          {item.summary ? (
            <p className="text-xs text-muted-foreground mt-2">{item.summary}</p>
          ) : null}
          {hasMedia ? (
            <Button variant="outline" size="sm" className="h-8 px-3 mt-3" asChild>
              {item.mediaType === 'upload' ? (
                <a href={mediaUrl} download={item.mediaName || 'resource'}>
                  {actionLabel}
                  <Download className="ml-2 h-3 w-3" />
                </a>
              ) : isExternalLink(mediaUrl) ? (
                <a href={mediaUrl} target="_blank" rel="noreferrer">
                  {actionLabel}
                  <Download className="ml-2 h-3 w-3" />
                </a>
              ) : (
                <Link to={mediaUrl}>
                  {actionLabel}
                  <Download className="ml-2 h-3 w-3" />
                </Link>
              )}
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground mt-3">No file or link attached.</p>
          )}
        </div>
        <div className="w-14 h-14 rounded-md bg-secondary/30 flex items-center justify-center">
          <span className="text-[10px] font-semibold text-muted-foreground text-center px-1">
            {getMediaBadge(item)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                {data.hero.imageUrl ? (
                  <img src={data.hero.imageUrl} alt={data.hero.imageAlt} className="w-full max-h-80 object-contain" />
                ) : (
                  <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
                    No image set
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {data.hero.title}
              </h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed`}>
                {data.hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {RESOURCE_KIND_CONFIG.map((section) => {
        const sectionResources = data.resources.filter((resource) => resource.kind === section.id);
        return (
          <section
            key={section.id}
            className={`py-16 lg:py-20 ${section.variant === 'muted' ? 'bg-card/50' : ''}`}
          >
            <div className="container mx-auto px-6 lg:px-16 xl:px-24">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
                {section.sectionTitle}
              </h2>
              {sectionResources.length ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sectionResources.map(renderCard)}
                </div>
              ) : (
                <p className="text-muted-foreground">{section.emptyMessage}</p>
              )}
            </div>
          </section>
        );
      })}

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{data.faq.title}</h2>
          </div>
          {data.faq.items.length ? (
            <div className="grid md:grid-cols-2 gap-6">
              {faqColumns.map((items, index) => (
                <Accordion key={`faq-col-${index}`} type="single" collapsible className="w-full">
                  {items.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                      <AccordionContent className={`${bodyTextClass} text-muted-foreground`}>
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
          <p className={`${bodyTextClass} text-muted-foreground max-w-2xl mx-auto mb-10`}>
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
