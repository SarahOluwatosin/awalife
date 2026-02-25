import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
};

const fadeUpNoBlur = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

interface PageHeroProps {
  title?: string;
  subtitle?: string;
  breadcrumb?: { label: string; path: string }[];
}

const PageHero = ({ title, subtitle, breadcrumb }: PageHeroProps) => {
  if (!title) return null;

  return (
    <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <motion.nav variants={fadeUp} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              {breadcrumb.map((crumb, i) => (
                <span key={crumb.path} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                  {i === breadcrumb.length - 1 ? (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.path} className="hover:text-primary transition-colors">{crumb.label}</Link>
                  )}
                </span>
              ))}
            </motion.nav>
          )}

          {/* Title with word-by-word animation */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            <motion.span
              className="inline"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {title.split(' ').map((word, i) => {
                const isGradient = i >= Math.floor(title.split(' ').length / 2);
                return (
                  <motion.span
                    key={i}
                    className={`inline-block mr-[0.25em] ${isGradient ? 'gradient-text' : ''}`}
                    variants={isGradient ? fadeUpNoBlur : fadeUp}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </motion.span>
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              variants={fadeUp}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
