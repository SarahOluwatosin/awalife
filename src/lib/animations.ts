const ease = [0.16, 1, 0.3, 1] as const; // Smooth checkout.com-style ease

export const sectionVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const staggerContainerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.65, ease } },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -50, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease } },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 50, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease } },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
};

// Blur-in effect inspired by motion.dev
export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.8, ease } },
};

// Slide up with slight rotation for cards
export const cardSlideUp = {
  hidden: { opacity: 0, y: 36, rotateX: 6, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
};

// Pop-in for icons and small elements
export const popIn = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
};

// Stagger container with delay before children start
export const staggerContainerDelayed = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export const viewportOnce = { once: true, amount: 0.15 as const };
export const viewportOnceSmall = { once: true, amount: 0.1 as const };
export const viewportOnceTiny = { once: true, amount: 0.05 as const };
