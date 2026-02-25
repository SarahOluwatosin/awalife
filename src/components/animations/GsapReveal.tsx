import { useEffect, useRef, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';

interface GsapRevealProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up';
  distance?: number;
  delay?: number;
  className?: string;
}

const GsapReveal = ({
  children,
  direction = 'up',
  distance = 60,
  delay = 0,
  className,
}: GsapRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const xFrom = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
      const yFrom = direction === 'up' ? distance : 0;
      gsap.fromTo(
        el,
        { x: xFrom, y: yFrom, opacity: 0, filter: 'blur(4px)' },
        {
          x: 0,
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.85,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [direction, distance, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default GsapReveal;
