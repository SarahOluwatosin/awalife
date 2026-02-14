const ease = [0.22, 1, 0.36, 1] as const;

export const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
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
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
};

// Blur-in effect inspired by motion.dev
export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 12 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.7, ease } },
};

// Slide up with slight rotation for cards
export const cardSlideUp = {
  hidden: { opacity: 0, y: 40, rotateX: 8 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease } },
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
