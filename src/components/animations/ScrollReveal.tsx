import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

// Child variant used when ScrollReveal acts as a stagger container
export const revealItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before animation starts (seconds). Only used when stagger is not set. */
  delay?: number;
  /** Y offset to animate from */
  y?: number;
  /** Fraction of element visible before triggering */
  amount?: number;
  /**
   * When set, ScrollReveal becomes a stagger container.
   * Wrap children with <RevealItem> to animate them individually.
   */
  stagger?: number;
}

/**
 * Wraps children in a scroll-triggered fade-up animation.
 * Set `stagger` to stagger direct children — use <RevealItem> as children in that case.
 */
const ScrollReveal = ({
  children,
  className,
  delay = 0,
  y = 32,
  amount = 0.1,
  stagger,
}: ScrollRevealProps) => {
  const variants = stagger
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }
    : {
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay } },
      };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

/** Individual animated child — use inside a <ScrollReveal stagger={...}> container. */
export const RevealItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div className={className} variants={revealItemVariants}>
    {children}
  </motion.div>
);

export default ScrollReveal;
