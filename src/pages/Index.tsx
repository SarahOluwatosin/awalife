import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import AboutSection from '@/components/sections/AboutSection';
import ProductsSection from '@/components/sections/ProductsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
