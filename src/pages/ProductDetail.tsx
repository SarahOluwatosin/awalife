import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Download, FileText, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import ai100vetImg from '@/assets/ai-100vet.png';
import microscopeImg from '@/assets/microscope-station.png';
import reagentsImg from '@/assets/reagents.png';

const ProductDetail = () => {
  const { productId } = useParams();
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const productData: Record<string, any> = {
    'ai-100vet': {
      image: ai100vetImg,
      name: t.products.ai100.name,
      description: t.products.ai100.fullDescription,
      features: t.products.ai100.features,
      specs: [
        { label: 'Sample Types', value: 'Blood, Feces, Urine, Ascites, Skin' },
        { label: 'Species Support', value: 'Mammals, Birds, Reptiles' },
        { label: 'Analysis Time', value: '< 3 minutes per sample' },
        { label: 'Throughput', value: '60+ samples/hour' },
        { label: 'Display', value: '10.1" HD Touchscreen' },
        { label: 'Connectivity', value: 'Wi-Fi, Ethernet, USB' },
        { label: 'Dimensions', value: '450 x 400 x 450 mm' },
        { label: 'Weight', value: '25 kg' },
      ],
    },
    'microscope': {
      image: microscopeImg,
      name: t.products.microscope.name,
      description: t.products.microscope.fullDescription,
      features: t.products.microscope.features,
      specs: [
        { label: 'Magnification', value: '40x - 1000x' },
        { label: 'Camera', value: '5MP HD Digital Camera' },
        { label: 'Sample Library', value: '10,000+ positive samples' },
        { label: 'Software', value: 'AI-assisted analysis suite' },
        { label: 'Connectivity', value: 'USB 3.0, HDMI' },
        { label: 'Report Format', value: 'PDF, DOCX, Direct Print' },
      ],
    },
    'reagents': {
      image: reagentsImg,
      name: t.products.reagents.name,
      description: t.products.reagents.fullDescription,
      features: t.products.reagents.features,
      specs: [
        { label: 'Storage Temperature', value: '2-8°C' },
        { label: 'Shelf Life', value: '18-24 months' },
        { label: 'Test Panels', value: 'CBC, Biochemistry, Parasitology' },
        { label: 'Compatibility', value: 'AI-100Vet, Microscope Station' },
        { label: 'Packaging', value: 'Single-use, sterile packs' },
      ],
    },
  };

  const product = productData[productId || ''] || productData['ai-100vet'];

  return (
    <Layout>
      <PageHero
        title={product.name}
        subtitle={t.products.subtitle}
        breadcrumb={[
          { label: t.nav.products, path: '/products' },
          { label: product.name, path: `/products/${productId}` },
        ]}
      />

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="glow-card p-8 lg:p-12 bg-gradient-to-br from-secondary/30 to-card">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-h-96 object-contain mx-auto"
              />
            </div>

            {/* Content */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">{t.products.keyFeatures}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild>
                  <Link to="/contact">Request Quote</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-border/50">
                  <Download className="mr-2 w-4 h-4" />
                  {t.products.brochure}
                </Button>
                <Button variant="ghost" size="lg">
                  <Play className="mr-2 w-4 h-4" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="w-full max-w-md mx-auto mb-8 bg-card border border-border">
              <TabsTrigger value="specifications" className="flex-1">{t.products.specifications}</TabsTrigger>
              <TabsTrigger value="downloads" className="flex-1">{t.products.downloads}</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications">
              <div className="glow-card overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {product.specs.map((spec: { label: string; value: string }, i: number) => (
                      <tr key={spec.label} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary/20'}>
                        <td className="px-6 py-4 font-medium text-foreground">{spec.label}</td>
                        <td className="px-6 py-4 text-muted-foreground">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="downloads">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Product Brochure', type: 'PDF', size: '2.4 MB' },
                  { name: 'Technical Specifications', type: 'PDF', size: '1.2 MB' },
                  { name: 'User Manual', type: 'PDF', size: '5.8 MB' },
                  { name: 'Quick Start Guide', type: 'PDF', size: '0.8 MB' },
                ].map((doc) => (
                  <div key={doc.name} className="glow-card p-6 flex items-center gap-4 cursor-pointer hover:border-primary/30">
                    <div className="icon-glow">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{doc.name}</h4>
                      <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
                    </div>
                    <Download className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
