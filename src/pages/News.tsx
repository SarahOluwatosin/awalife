import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, FileText, BookOpen, Package, MoreHorizontal, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';
import { RESOURCE_KIND_CONFIG, RESOURCE_PRODUCT_OPTIONS } from '@/data/resources';
import type { ResourceItem } from '@/data/resources';
import { motion } from 'framer-motion';
import { sectionVariants, staggerContainer, cardSlideUp, blurIn, viewportOnce, viewportOnceSmall } from '@/lib/animations';

const SECTION_ICONS: Record<string, typeof FileText> = {
  'how-to': BookOpen,
  'medical': FileText,
  'product': Package,
  'other': MoreHorizontal
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

  const isVideoLink = (url: string) => {
    if (!url) return false;
    return /youtube\.com|youtu\.be|vimeo\.com/i.test(url) || /\.(mp4|webm|ogg)(\?|$)/i.test(url);
  };

  const getVideoEmbedUrl = (url: string): string | null => {
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return null;
  };

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
    const isVideo = item.mediaType === 'link' && isVideoLink(mediaUrl);
    const embedUrl = isVideo ? getVideoEmbedUrl(mediaUrl) : null;
    const actionLabel = item.mediaType === 'link' ? 'View resource' : 'Download';
    const ActionIcon = item.mediaType === 'link' ? ArrowRight : Download;
    const badge = getMediaBadge(item);

    return (
      <div
        key={item.id}
        className="group relative flex flex-col rounded-2xl bg-card border border-border/20 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">

        {/* Accent gradient top */}
        <div className="h-1 rounded-t-2xl bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

        {/* Video embed preview */}
        {embedUrl &&
        <div className="relative w-full aspect-video bg-muted/30">
            <iframe
            src={embedUrl}
            className="w-full h-full"
            style={{ border: 'none' }}
            allowFullScreen
            allow="autoplay; encrypted-media"
            title={item.title}
            loading="lazy" />

          </div>
        }

        <div className="flex flex-col flex-1 p-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-primary/8 text-primary border border-primary/10">
              {productLabel}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-secondary text-muted-foreground border border-border/30">
              {badge}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
            {item.title}
          </h3>

          {/* Summary */}
          {item.summary &&
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
              {item.summary}
            </p>
          }

          {/* Action */}
          <div className="mt-auto pt-2">
            {hasMedia ?
            <div className="flex flex-wrap gap-2">
                {isVideo &&
              <Button variant="default" size="sm" className="h-10 px-5 rounded-full transition-all" asChild>
                    <a href={mediaUrl} target="_blank" rel="noreferrer">
                      <Play className="mr-2 h-4 w-4" />
                      Watch video
                    </a>
                  </Button>
              }
                {!isVideo &&
              <Button variant="outline" size="sm" className="h-10 px-5 rounded-full border-border/40 text-primary hover:bg-primary/5 hover:border-primary/30 transition-all" asChild>
                    {item.mediaType === 'upload' ?
                <a href={mediaUrl} download={item.mediaName || 'resource'}>
                        <ActionIcon className="mr-2 h-4 w-4" />
                        {actionLabel}
                      </a> :
                isExternalLink(mediaUrl) ?
                <a href={mediaUrl} target="_blank" rel="noreferrer">
                        <ActionIcon className="mr-2 h-4 w-4" />
                        {actionLabel}
                      </a> :

                <Link to={mediaUrl}>
                        <ActionIcon className="mr-2 h-4 w-4" />
                        {actionLabel}
                      </Link>
                }
                  </Button>
              }
              </div> :

            <p className="text-xs text-muted-foreground/50 italic">No file or link attached</p>
            }
          </div>
        </div>
      </div>);

  };

  return (
    <Layout>
      {/* Hero */}
      <motion.section className="pt-32 pb-16 lg:pt-36 lg:pb-20" initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={blurIn}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
                Explore resources 
              </span>
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
174:                 <span className="gradient-text">{data.hero.title}</span>
175:               </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {data.hero.description}
              </p>
            </motion.div>
            <motion.div className="relative" variants={sectionVariants}>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/8 to-accent/8 rounded-3xl blur-3xl opacity-50" />
              <div className="relative rounded-2xl overflow-hidden border border-border/30 bg-secondary/20 shadow-lg">
                {data.hero.imageUrl ?
                <img
                  src={data.hero.imageUrl}
                  alt={data.hero.imageAlt}
                  data-override-id="resources-hero"
                  className="w-full aspect-[4/3] object-cover"
                  loading="eager"
                  decoding="async" /> :


                <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
                    No image set
                  </div>
                }
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Resource Sections */}
      {RESOURCE_KIND_CONFIG.map((section) => {
        const sectionResources = data.resources.filter((resource) => resource.kind === section.id);
        if (!sectionResources.length) return null;
        const SectionIcon = SECTION_ICONS[section.id] || FileText;
        return (
          <motion.section
            key={section.id}
            className={`py-16 lg:py-20 ${section.variant === 'muted' ? 'bg-card/50' : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceSmall}
            variants={sectionVariants}>

            <div className="container mx-auto px-6 lg:px-16 xl:px-24">
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <SectionIcon className="h-4 w-4" />
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  {section.sectionTitle}
                </h2>
              </div>
              <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnceSmall}>
                {sectionResources.map((item) =>
                <motion.div key={item.id} variants={cardSlideUp}>
                    {renderCard(item)}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.section>);

      })}

      {/* FAQ */}
      <motion.section className="py-20 lg:py-28" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked <span className="gradient-text">Questions</span></h2>
          </div>
          {data.faq.items.length ?
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {faqColumns.map((items, index) =>
            <Accordion key={`faq-col-${index}`} type="single" collapsible className="w-full">
                  {items.map((item) =>
              <AccordionItem key={item.id} value={item.id} className="border-border/30">
                      <AccordionTrigger className="text-left text-foreground hover:text-primary transition-colors">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
              )}
                </Accordion>
            )}
            </div> :

          <p className="text-center text-muted-foreground">No FAQs yet.</p>
          }
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section className="py-20 lg:py-28 bg-card/50" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Interested in <span className="gradient-text">Our Products</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {data.cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild>
              {isExternalLink(ctaLink) ?
              <a href={ctaLink} target="_blank" rel="noreferrer">
                  {data.cta.buttonLabel}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a> :

              <Link to={ctaLink}>
                  {data.cta.buttonLabel}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              }
            </Button>
          </div>
        </div>
      </motion.section>
    </Layout>);

};

export default News;