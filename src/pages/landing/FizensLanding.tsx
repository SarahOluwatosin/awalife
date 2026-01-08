import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import AboutSection from '@/components/sections/AboutSection';
import ProductsSection from '@/components/sections/ProductsSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import CTASection from '@/components/sections/CTASection';

const FizensLanding = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ProductsSection />
      <WhyUsSection />
      <CTASection />
    </Layout>
  );
};

export default FizensLanding;
