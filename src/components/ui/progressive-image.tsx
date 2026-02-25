import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Aspect ratio class e.g. "aspect-[5/4]" — applied to the wrapper */
  aspectClassName?: string;
}

/**
 * Wraps a standard <img> with a skeleton placeholder that fades out
 * once the image has loaded, preventing layout shift and blank areas.
 */
const ProgressiveImage = ({
  className,
  aspectClassName,
  alt,
  onLoad,
  ...props
}: ProgressiveImageProps) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
      onLoad?.(e);
    },
    [onLoad],
  );

  return (
    <div className={cn('relative overflow-hidden', aspectClassName)}>
      {/* Skeleton shown until image loads */}
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-xl" />
      )}
      <img
        {...props}
        alt={alt}
        onLoad={handleLoad}
        className={cn(
          'transition-opacity duration-500 ease-out',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
      />
    </div>
  );
};

export default ProgressiveImage;
