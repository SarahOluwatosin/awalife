import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ProductsSection from '@/components/sections/ProductsSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import GlobalPartnersSection from '@/components/sections/GlobalPartnersSection';
import CTASection from '@/components/sections/CTASection';
import { motion, MotionConfig } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const Index = () => (
  <Layout>
    <MotionConfig reducedMotion="user">
      {/* Page entrance — fades the whole page in on first load */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <HeroSection />
        <WhyUsSection />
        <ProductsSection />
        <CertificationsSection />
        <GlobalPartnersSection />
        <CTASection />
      </motion.div>
    </MotionConfig>
  </Layout>
);

export default Index;
