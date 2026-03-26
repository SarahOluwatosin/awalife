import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';
import { usePageContent } from '@/contexts/PageContentContext';
import { RESOURCE_KIND_CONFIG, RESOURCE_PRODUCT_OPTIONS } from '@/data/resources';
import type { ResourceItem } from '@/data/resources';
import { motion } from 'framer-motion';
import { sectionVariants, staggerContainer, cardSlideUp, blurIn, viewportOnce, viewportOnceSmall } from '@/lib/animations';

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data } = useResourcesCMS();
  const { getContent } = usePageContent();
  const c = (key: string, fb: string) => getContent('resources', 'hero', key, fb);

  const faqMidpoint = Math.ceil(data.faq.items.length / 2);
  const faqColumns = [data.faq.items.slice(0, faqMidpoint), data.faq.items.slice(faqMidpoint)];
  const [columnCount, setColumnCount] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const resourcesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setColumnCount(3);
      } else if (width >= 768) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const isExternalLink = (url: string) =>
  /^(https?:)?\/\//i.test(url) || url.startsWith('mailto:') || url.startsWith('tel:');

  const isVideoLink = (url: string) => {
    if (!url) return false;
    return /youtube\.com|youtu\.be|vimeo\.com/i.test(url) || /\.(mp4|webm|ogg)(\?|$)/i.test(url);
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

  const randomSeedRef = useRef(Math.random());

  const createSeededRandom = (seed: number) => () => {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const estimateCardWeight = (item: ResourceItem) => {
    const titleWeight = item.title.length * 0.6;
    const summaryWeight = item.summary ? item.summary.length * 0.9 : 0;
    const mediaWeight = item.mediaUrl?.trim() ? 22 : 0;
    return 60 + titleWeight + summaryWeight + mediaWeight;
  };

  const buildMasonryColumns = (items: ResourceItem[], columns: number, seed: number) => {
    const totalColumns = Math.max(1, columns);
    const random = createSeededRandom(seed);
    const weighted = items.map((item) => ({
      item,
      weight: estimateCardWeight(item) + random() * 40,
    }));
    weighted.sort((a, b) => b.weight - a.weight);

    const columnItems: ResourceItem[][] = Array.from({ length: totalColumns }, () => []);
    const columnHeights = Array.from({ length: totalColumns }, () => 0);

    weighted.forEach(({ item, weight }) => {
      const shortestIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columnItems[shortestIndex].push(item);
      columnHeights[shortestIndex] += weight;
    });

    return columnItems;
  };

  const renderCard = (item: ResourceItem) => {
    const productLabel = productLabelMap[item.productId] || 'Product';
    const mediaUrl = item.mediaUrl?.trim();
    const hasMedia = Boolean(mediaUrl);
    const isVideo = item.mediaType === 'link' && isVideoLink(mediaUrl);
    const actionLabel = item.mediaType === 'link' ? 'View resource' : 'Download';
    const ActionIcon = item.mediaType === 'link' ? ArrowRight : Download;
    const badge = getMediaBadge(item);

    return (
      <div
        key={item.id}
        className="group relative flex h-full flex-col rounded-2xl bg-card border border-border/20 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">

        <div className="flex flex-col md:flex-row gap-5 p-5 h-full">
          <div className="relative w-full md:w-36 lg:w-40 md:flex-shrink-0 aspect-[16/10] md:aspect-[3/4] rounded-xl bg-gradient-to-br from-secondary/80 via-white to-secondary/40 border border-border/30 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-8 h-32 w-32 rounded-full bg-primary/10" />
              <div className="absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-primary/10" />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-start gap-2 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-primary/8 text-primary border border-primary/10">
                {productLabel}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-secondary text-muted-foreground border border-border/30">
                {badge}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[2.8rem]">
              {item.title}
            </h3>

            {/* Summary */}
            {item.summary &&
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                {item.summary}
              </p>
            }

            {/* Action */}
            <div className="mt-auto pt-1">
              {hasMedia ?
              <div className="flex flex-wrap gap-2">
                  {isVideo &&
                <Button variant="default" size="sm" className="btn-gradient h-9 px-4 py-2 rounded-full transition-all" asChild>
                      <a href={mediaUrl} target="_blank" rel="noreferrer">
                        <Play className="mr-2 h-4 w-4" />
                        Watch video
                      </a>
                    </Button>
                }
                  {!isVideo &&
                <Button variant="default" size="sm" className="btn-gradient h-9 px-4 py-2 rounded-full transition-all" asChild>
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
        </div>
      </div>);

  };

  const renderResourcesGrid = (items: ResourceItem[], emptyMessage = 'No resources yet.', seedOffset = 0) => {
    if (!items.length) {
      return <p className="text-center text-muted-foreground">{emptyMessage}</p>;
    }

    const columns = buildMasonryColumns(items, columnCount, randomSeedRef.current + seedOffset);

    return (
      <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((column, columnIndex) => (
          <motion.div
            key={`col-${seedOffset}-${columnIndex}`}
            className="flex flex-col gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceSmall}
          >
            {column.map((item) => (
              <motion.div key={item.id} variants={cardSlideUp}>
                {renderCard(item)}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <motion.section className="pt-32 pb-16 lg:pt-36 lg:pb-20" initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={blurIn}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
                {c('badge', 'Explore resources')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {c('title', 'Welcome to')} <span className="gradient-text">{c('title_highlight', 'Resource')}</span> {c('title_suffix', 'Center')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                {data.hero.description}
              </p>
            </motion.div>
            <motion.div className="relative" variants={sectionVariants}>
              <div className="rounded-2xl overflow-hidden">
                {data.hero.imageUrl ?
                <img
                  src={data.hero.imageUrl}
                  alt={data.hero.imageAlt}
                  data-override-id="resources-hero"
                  className="w-full h-full max-h-[400px] object-cover rounded-3xl"
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

      {/* Resources Tabs */}
      <motion.section ref={resourcesRef} className="py-16 lg:py-20 bg-card/20" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap justify-start gap-3 bg-transparent p-0 mb-10">
              <TabsTrigger
                value="all"
                className="resource-tab rounded-full px-6 py-2 text-sm font-semibold border border-border/40 bg-card/40 text-muted-foreground shadow-sm transition-colors"
              >
                All
              </TabsTrigger>
              {RESOURCE_KIND_CONFIG.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="resource-tab rounded-full px-6 py-2 text-sm font-semibold border border-border/40 bg-card/40 text-muted-foreground shadow-sm transition-colors"
                >
                  {section.sectionTitle}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {renderResourcesGrid(data.resources, 'No resources yet.', 0)}
            </TabsContent>
            {RESOURCE_KIND_CONFIG.map((section, index) => {
              const sectionResources = data.resources.filter((resource) => resource.kind === section.id);
              return (
                <TabsContent key={section.id} value={section.id} className="mt-0">
                  {renderResourcesGrid(sectionResources, section.emptyMessage, index + 1)}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section className="py-20 lg:py-28" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
              {getContent('resources', 'faq', 'badge', 'FAQ')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{getContent('resources', 'faq', 'title', 'Frequently Asked')} <span className="gradient-text">{getContent('resources', 'faq', 'title_highlight', 'Questions')}</span>{getContent('resources', 'faq', 'title_suffix', '')}</h2>
          </div>
          {data.faq.items.length ?
          <div className="grid md:grid-cols-2 gap-6">
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
          <p className="text-lg text-muted-foreground max-w-5xl mx-auto mb-10">
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
