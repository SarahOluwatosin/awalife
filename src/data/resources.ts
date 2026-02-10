import heroDiagnosticLab from '@/assets/hero-diagnostic-lab.jpg';

export const RESOURCE_KIND_CONFIG = [
  {
    id: 'how-to',
    label: 'How-to Guide',
    sectionTitle: 'How-to Guides',
    variant: 'plain',
    emptyMessage: 'No guides yet.',
    summaryLabel: 'Guide summary',
  },
  {
    id: 'medical',
    label: 'Medical Resource',
    sectionTitle: 'Medical Resources',
    variant: 'muted',
    emptyMessage: 'No medical resources yet.',
    summaryLabel: 'Clinical focus',
  },
  {
    id: 'product',
    label: 'Product Info',
    sectionTitle: 'Product Info',
    variant: 'plain',
    emptyMessage: 'No product info yet.',
    summaryLabel: 'Spec summary',
  },
  {
    id: 'other',
    label: 'Other',
    sectionTitle: 'Others',
    variant: 'plain',
    emptyMessage: 'No resources yet.',
    summaryLabel: 'Summary',
  },
] as const;

export type ResourceKind = (typeof RESOURCE_KIND_CONFIG)[number]['id'];

export const RESOURCE_PRODUCT_OPTIONS = [
  { id: 'all', label: 'All Products' },
  { id: 'ai-analyzer', label: 'AI Series Morphology Analyzer' },
  { id: 'ai-100vet-elite', label: 'AI-100Vet Elite Morphological Analyzer' },
  { id: 'ai-100vet', label: 'AI-100Vet Morphological Analyzer' },
  { id: 'ai-80vet', label: 'AI-80Vet Morphological Analyzer' },
  { id: 'dm-03', label: 'DM-03 Microscope Workstation' },
] as const;

export type ResourceProductId = (typeof RESOURCE_PRODUCT_OPTIONS)[number]['id'];

export type ResourceMediaType = 'upload' | 'link';

export type ResourceItem = {
  id: string;
  title: string;
  summary: string;
  kind: ResourceKind;
  productId: ResourceProductId;
  mediaType: ResourceMediaType;
  mediaUrl: string;
  mediaName: string;
  mediaMime: string;
};

export type ResourceFAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type ResourceFAQ = {
  title: string;
  items: ResourceFAQItem[];
};

export type ResourceCTA = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
};

export type ResourceHero = {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
};

export type ResourcesCMSData = {
  hero: ResourceHero;
  resources: ResourceItem[];
  faq: ResourceFAQ;
  cta: ResourceCTA;
};

export const getDefaultResourcesData = (): ResourcesCMSData => ({
  hero: {
    title: 'Welcome to Resource Center',
    description:
      'Explore case studies, videos, white papers, and sample reports designed to help you evaluate and standardize morphology workflows - across blood, urine, feces, and fluids.',
    imageUrl: heroDiagnosticLab,
    imageAlt: 'Resource center',
  },
  resources: [],
  faq: {
    title: 'Frequent Asked Question',
    items: [
      {
        id: 'faq-1',
        question: 'Norrasst quam pedibus tua pericula nolens',
        answer: 'Download the related resource or contact our team for more details.',
      },
      {
        id: 'faq-2',
        question: 'Pericula harenens neutra turbinis errant adomto misa',
        answer: 'Download the related resource or contact our team for more details.',
      },
      {
        id: 'faq-3',
        question: 'Lorem ipsum dolor',
        answer: 'Download the related resource or contact our team for more details.',
      },
      {
        id: 'faq-4',
        question: 'Memorantur tacti quod crudelis domos',
        answer: 'Download the related resource or contact our team for more details.',
      },
    ],
  },
  cta: {
    title: 'Interested in Our Products?',
    description:
      "Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.",
    buttonLabel: 'Contact us',
    buttonUrl: '/contact',
  },
});

const isString = (value: unknown) => typeof value === 'string';
const resourceKindIds = new Set(RESOURCE_KIND_CONFIG.map((kind) => kind.id));
const resourceProductIds = new Set(RESOURCE_PRODUCT_OPTIONS.map((product) => product.id));
const resourceMediaTypes = new Set<ResourceMediaType>(['upload', 'link']);

const isResourceKind = (value: unknown): value is ResourceKind =>
  isString(value) && resourceKindIds.has(value as ResourceKind);

const isResourceProductId = (value: unknown): value is ResourceProductId =>
  isString(value) && resourceProductIds.has(value as ResourceProductId);

const isResourceMediaType = (value: unknown): value is ResourceMediaType =>
  isString(value) && resourceMediaTypes.has(value as ResourceMediaType);

export const isResourcesCMSData = (value: unknown): value is ResourcesCMSData => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const data = value as ResourcesCMSData;
  if (!data.hero || !isString(data.hero.title) || !isString(data.hero.description)) {
    return false;
  }
  if (!isString(data.hero.imageUrl) || !isString(data.hero.imageAlt)) {
    return false;
  }
  if (!Array.isArray(data.resources)) {
    return false;
  }
  const resourcesValid = data.resources.every((resource) =>
    isString(resource.id) &&
    isString(resource.title) &&
    isString(resource.summary) &&
    isResourceKind(resource.kind) &&
    isResourceProductId(resource.productId) &&
    isResourceMediaType(resource.mediaType) &&
    isString(resource.mediaUrl) &&
    isString(resource.mediaName) &&
    isString(resource.mediaMime),
  );
  if (!resourcesValid) {
    return false;
  }
  if (!data.faq || !isString(data.faq.title) || !Array.isArray(data.faq.items)) {
    return false;
  }
  const faqValid = data.faq.items.every((item) =>
    isString(item.id) &&
    isString(item.question) &&
    isString(item.answer),
  );
  if (!faqValid) {
    return false;
  }
  if (!data.cta || !isString(data.cta.title) || !isString(data.cta.description)) {
    return false;
  }
  return isString(data.cta.buttonLabel) && isString(data.cta.buttonUrl);
};
