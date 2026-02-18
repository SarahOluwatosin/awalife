import { Check, X, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComparisonProduct {
  id: string;
  name: string;
  shortName: string;
  flagship?: boolean;
}

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    values: Record<string, boolean | string>;
  }[];
}

interface ProductComparisonProps {
  variant?: 'full' | 'ai-analyzer';
}

const ProductComparison = ({ variant = 'full' }: ProductComparisonProps) => {
  const { t } = useLanguage();
  const containerClass = 'container mx-auto px-6 lg:px-16 xl:px-24';
  
  const products: ComparisonProduct[] = variant === 'ai-analyzer'
    ? [
      { id: 'ai-100vet-elite', name: 'AI-100Vet Elite', shortName: 'AI-100Vet Elite', flagship: true },
      { id: 'ai-100vet', name: 'AI-100Vet', shortName: 'AI-100Vet' },
      { id: 'ai-80vet', name: 'AI-80Vet', shortName: 'AI-80Vet' },
    ]
    : [
      { id: 'ai-100vet-elite', name: 'AI-100Vet Elite', shortName: 'Elite', flagship: true },
      { id: 'ai-100vet', name: 'AI-100Vet', shortName: 'AI-100' },
      { id: 'ai-80vet', name: 'AI-80Vet', shortName: 'AI-80' },
      { id: 'microscope', name: 'Digital Microscope', shortName: 'Microscope' },
    ];
  
  const comparisonData: ComparisonFeature[] = variant === 'ai-analyzer'
    ? [
      {
        category: 'Sample Types',
        features: [
          { name: 'Blood', values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true } },
          { name: 'Feces', values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true } },
          { name: 'Urine', values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true } },
          { name: 'Fluid', values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': false } },
        ],
      },
      {
        category: 'Species Support',
        features: [
          { name: 'Companion & Small Mammals', values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true } },
          { name: 'Avian', values: { 'ai-100vet-elite': false, 'ai-100vet': true, 'ai-80vet': false } },
          { name: 'Reptile', values: { 'ai-100vet-elite': false, 'ai-100vet': true, 'ai-80vet': false } },
          { name: 'Livestock & Large Animals', values: { 'ai-100vet-elite': false, 'ai-100vet': true, 'ai-80vet': false } },
        ],
      },
    ]
    : [
    {
      category: 'Sample Types',
      features: [
        { 
          name: 'Blood Analysis', 
          values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true, 'microscope': 'Manual' } 
        },
        { 
          name: 'Feces Analysis', 
          values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true, 'microscope': 'Manual' } 
        },
        { 
          name: 'Urine Sediment', 
          values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true, 'microscope': 'Manual' } 
        },
        { 
          name: 'Pleural Fluid', 
          values: { 'ai-100vet-elite': false, 'ai-100vet': true, 'ai-80vet': false, 'microscope': 'Manual' } 
        },
      ],
    },
    {
      category: 'Species Support',
      features: [
        { 
          name: 'Cats & Dogs', 
          values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true, 'microscope': true } 
        },
        { 
          name: 'Exotic Animals (10+)', 
          values: { 'ai-100vet-elite': false, 'ai-100vet': true, 'ai-80vet': false, 'microscope': true } 
        },
      ],
    },
    {
      category: 'Technology',
      features: [
        { 
          name: 'AI Recognition', 
          values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true, 'microscope': false } 
        },
        { 
          name: 'Microfluidic Smearing', 
          values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true, 'microscope': false } 
        },
        { 
          name: 'Auto Report Generation', 
          values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true, 'microscope': true } 
        },
        { 
          name: '4K Camera', 
          values: { 'ai-100vet-elite': false, 'ai-100vet': false, 'ai-80vet': false, 'microscope': true } 
        },
        { 
          name: 'HD Real-time Imaging', 
          values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true, 'microscope': true } 
        },
      ],
    },
    {
      category: 'Analysis',
      features: [
        { 
          name: '7-Part WBC Differential', 
          values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true, 'microscope': false } 
        },
        { 
          name: 'Parasite Detection', 
          values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true, 'microscope': 'Manual' } 
        },
        { 
          name: 'Crystal & Cast Detection', 
          values: { 'ai-100vet-elite': true, 'ai-100vet': true, 'ai-80vet': true, 'microscope': 'Manual' } 
        },
      ],
    },
    {
      category: 'Configuration',
      features: [
        { 
          name: 'Configurable Testing', 
          values: { 'ai-100vet-elite': false, 'ai-100vet': false, 'ai-80vet': true, 'microscope': false } 
        },
        { 
          name: 'Built-in Sample Library', 
          values: { 'ai-100vet-elite': false, 'ai-100vet': false, 'ai-80vet': false, 'microscope': true } 
        },
      ],
    },
    ];
  
  const renderValue = (value: boolean | string) => {
    if (value === true) {
      return (
        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20">
          <Check className="w-4 h-4 text-primary" />
        </div>
      );
    }
    if (value === false) {
      return (
        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted/50">
          <Minus className="w-4 h-4 text-muted-foreground/50" />
        </div>
      );
    }
    return (
      <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-muted-foreground">
        {value}
      </span>
    );
  };

  return (
    <section className="py-16 lg:py-20">
      <div className={containerClass}>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
            Compare Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find the <span className="gradient-text">Right Solution</span>
          </h2>
          <p className="text-muted-foreground">
            {variant === 'ai-analyzer'
              ? 'Compare models across sample types and species support to match your clinic’s needs.'
              : 'Compare features across our product lineup to find the perfect fit for your practice'}
          </p>
        </div>
        
        <div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              {/* Header */}
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-5 lg:p-6 bg-card sticky left-0 z-10 min-w-[200px]">
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Features
                    </span>
                  </th>
                  {products.map((product) => (
                    <th 
                      key={product.id} 
                      className={cn(
                        "p-5 lg:p-6 text-center min-w-[140px]",
                        product.flagship && "bg-primary/5"
                      )}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="font-semibold text-foreground">{product.shortName}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              {/* Body */}
              <tbody>
                {comparisonData.map((category, catIdx) => (
                  <>
                    {/* Category Header */}
                    <tr key={`cat-${catIdx}`} className="bg-secondary/30">
                      <td 
                        colSpan={products.length + 1}
                        className="px-5 lg:px-6 py-3 text-sm font-semibold text-foreground uppercase tracking-wider"
                      >
                        {category.category}
                      </td>
                    </tr>
                    
                    {/* Features */}
                    {category.features.map((feature, featIdx) => (
                      <tr 
                        key={`feat-${catIdx}-${featIdx}`}
                        className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                      >
                        <td className="p-5 lg:p-6 text-sm text-muted-foreground sticky left-0 bg-card z-10">
                          {feature.name}
                        </td>
                        {products.map((product) => (
                          <td 
                            key={product.id} 
                            className={cn(
                              "p-5 lg:p-6 text-center",
                              product.flagship && "bg-primary/5"
                            )}
                          >
                            {renderValue(feature.values[product.id])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;
