import { motion } from 'framer-motion';

const AnimatedGradientBg = ({ className = '' }: { className?: string }) => {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.08) 0%, transparent 50%), ' +
          'radial-gradient(ellipse at 70% 80%, hsl(var(--accent) / 0.06) 0%, transparent 50%), ' +
          'radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.03) 0%, transparent 70%)',
        backgroundSize: '200% 200%',
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%', '0% 100%', '100% 0%', '0% 0%'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export default AnimatedGradientBg;
