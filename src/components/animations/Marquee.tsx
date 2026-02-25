import { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** CSS duration string, e.g. "30s" */
  duration?: string;
  /** Reverse scroll direction */
  reverse?: boolean;
  /** Pause on mouse hover */
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal marquee.
 * Renders children twice for a seamless loop using the `marquee` keyframe
 * already defined in index.css (translateX 0 → -50%).
 *
 * Gap logic: `pr-8` on each copy matches the `gap-8` between items so the
 * seam between the end of copy 1 and start of copy 2 is visually identical.
 */
const Marquee = ({
  children,
  className,
  duration = '30s',
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) => {
  const style: CSSProperties = {
    animation: `marquee ${duration} linear infinite`,
    animationDirection: reverse ? 'reverse' : 'normal',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused';
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running';
  };

  return (
    <div className={cn('overflow-hidden', className)}>
      <div
        className="flex w-max"
        style={style}
        onMouseEnter={pauseOnHover ? handleEnter : undefined}
        onMouseLeave={pauseOnHover ? handleLeave : undefined}
      >
        {/* pr-8 matches the gap-8 between items — keeps the seam invisible */}
        <div className="flex items-center gap-8 pr-8">{children}</div>
        <div className="flex items-center gap-8 pr-8" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
