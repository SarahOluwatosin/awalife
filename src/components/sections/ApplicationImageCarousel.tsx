import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { dbSelect } from '@/lib/db';
import { cn } from '@/lib/utils';

type CarouselImage = {
  id: string;
  image_url: string;
  label: string;
  sort_order: number;
};

interface ApplicationImageCarouselProps {
  pageKey: string;
  fallbackImages?: { url: string; label: string }[];
}

const ease = [0.16, 1, 0.3, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 50 : -50,
    opacity: 0,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -50 : 50,
    opacity: 0,
    filter: 'blur(4px)',
    transition: { duration: 0.35, ease },
  }),
};

const staticGridVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease },
  },
};

const ApplicationImageCarousel = ({ pageKey, fallbackImages = [] }: ApplicationImageCarouselProps) => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const rows = await dbSelect<CarouselImage>(
          'application_carousel_images',
          `page_key=eq.${pageKey}&order=sort_order.asc`
        );
        setImages(rows);
      } catch (err) {
        console.error('[Carousel] fetch error', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [pageKey]);

  const displayImages = images.length > 0
    ? images.map(i => ({ url: i.image_url, label: i.label }))
    : fallbackImages;

  const itemsPerView = 4;
  const maxIndex = Math.max(0, displayImages.length - itemsPerView);

  const scrollPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  }, [maxIndex]);

  const scrollNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  }, [maxIndex]);

  // Auto-scroll
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      scrollNext();
    }, 4000);
  }, [scrollNext]);

  useEffect(() => {
    if (displayImages.length <= itemsPerView) return;
    startAutoScroll();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [displayImages.length, itemsPerView, startAutoScroll]);

  const handleManualNav = useCallback((cb: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    cb();
    startAutoScroll();
  }, [startAutoScroll]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="rounded-2xl border border-border/50 bg-card shadow-sm p-4 animate-pulse">
            <div className="w-full aspect-square bg-muted rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (displayImages.length === 0) return null;

  // If 4 or fewer, show static grid with entrance animation
  if (displayImages.length <= itemsPerView) {
    return (
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={staticGridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {displayImages.map((img, idx) => (
          <div key={idx} className="rounded-2xl border border-border/50 bg-card shadow-sm p-4 text-center">
            <img src={img.url} alt={img.label || `Sample ${idx + 1}`} data-override-id={`${pageKey}-carousel-${idx}`} className="w-full aspect-square object-cover rounded-lg" />
            {img.label && (
              <p className="text-xs text-muted-foreground mt-2 truncate">{img.label}</p>
            )}
          </div>
        ))}
      </motion.div>
    );
  }

  // Handle wrapping: if near the end, wrap around to get enough items
  const getVisibleImages = () => {
    const result = [];
    for (let i = 0; i < itemsPerView; i++) {
      const idx = (currentIndex + i) % displayImages.length;
      result.push(displayImages[idx]);
    }
    return result;
  };
  const visibleImages = getVisibleImages();

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full shrink-0"
          onClick={() => handleManualNav(scrollPrev)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="overflow-hidden flex-1">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {visibleImages.map((img, idx) => (
                <div key={currentIndex + idx} className="rounded-2xl border border-border/50 bg-card shadow-sm p-4 text-center">
                  <img
                    src={img.url}
                    alt={img.label || `Sample ${currentIndex + idx + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  {img.label && (
                    <p className="text-xs text-muted-foreground mt-2 truncate">{img.label}</p>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full shrink-0"
          onClick={() => handleManualNav(scrollNext)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
            )}
            onClick={() => handleManualNav(() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationImageCarousel;
