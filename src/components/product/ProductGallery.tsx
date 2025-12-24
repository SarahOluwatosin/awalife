import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Lightbox */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-8"
          onClick={() => setIsZoomed(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 z-10 text-foreground hover:bg-secondary"
            onClick={() => setIsZoomed(false)}
          >
            <X className="w-6 h-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground hover:bg-secondary"
            onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          
          <img
            src={images[activeIndex]}
            alt={`${productName} - View ${activeIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain"
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground hover:bg-secondary"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  idx === activeIndex 
                    ? "bg-primary w-8" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gallery */}
      <div className="group relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-3xl blur-3xl opacity-50" />
        
        {/* Main Image */}
        <div className="relative glow-card p-6 lg:p-10 bg-gradient-to-br from-secondary/50 via-card to-secondary/30 overflow-hidden">
          <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-primary/5 animate-float" />
          <div className="absolute bottom-12 left-8 w-20 h-20 rounded-full bg-accent/5 animate-float" style={{ animationDelay: '2s' }} />
          
          <div className="relative aspect-square flex items-center justify-center">
            <img
              src={images[activeIndex]}
              alt={`${productName} - View ${activeIndex + 1}`}
              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            />
          </div>
          
          {/* Zoom button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary/80 hover:bg-secondary"
            onClick={() => setIsZoomed(true)}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary/80 hover:bg-secondary"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary/80 hover:bg-secondary"
                onClick={handleNext}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
        
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 mt-4 justify-center">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300",
                  idx === activeIndex 
                    ? "border-primary ring-2 ring-primary/30" 
                    : "border-border/50 hover:border-primary/50"
                )}
              >
                <img
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain bg-card p-2"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductGallery;
