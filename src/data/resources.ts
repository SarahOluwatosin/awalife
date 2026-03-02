import { images } from '@/lib/images';

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

export const NEWS_CATEGORIES = [
  'Company News',
  'Product Updates',
  'Events',
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: NewsCategory;
  location: string;
  imageUrl: string;
  status: 'published' | 'draft';
  slug: string;
  metaTitle: string;
  metaDesc: string;
  sortOrder: number;
};

export type ResourcesCMSData = {
  hero: ResourceHero;
  resources: ResourceItem[];
  faq: ResourceFAQ;
  cta: ResourceCTA;
  news: NewsItem[];
};

export const getDefaultResourcesData = (): ResourcesCMSData => ({
  hero: {
    title: 'Welcome to Resource Center',
    description:
      'Explore case studies, videos, white papers, and sample reports designed to help you evaluate and standardize morphology workflows - across blood, urine, feces, and fluids.',
    imageUrl: images.heroDiagnosticLab,
    imageAlt: 'Resource center',
  },
  resources: [],
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        id: 'faq-1',
        question: 'What sample types does the Awalife platform support?',
        answer: 'The platform supports blood, urine, feces, and body fluid samples for comprehensive morphology analysis.',
      },
      {
        id: 'faq-2',
        question: 'Which animal species are compatible?',
        answer: 'It supports companion animals, small mammals, large animals, avian species, reptiles, and exotic pets.',
      },
      {
        id: 'faq-3',
        question: 'How does the AI assist in diagnostics?',
        answer: 'AI-assisted morphology recognition automatically classifies and counts cells, generating review-ready reports with quantitative results.',
      },
      {
        id: 'faq-4',
        question: 'Is training and support available?',
        answer: 'Yes, Awalife provides online support, clinical expert network access, and dedicated 1-on-1 support for distributors and partners.',
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
  news: [
    {
      id: 'news-1',
      title: 'AWALIFE at KSFM Conference 2024',
      excerpt: 'AWALIFE showcased its latest AI-100Vet analyzer at the KSFM exhibition held in Seoul, South Korea, receiving enthusiastic responses from veterinary professionals.',
      content: '',
      date: '2024-11-21',
      category: 'Events',
      location: 'Seoul, South Korea',
      imageUrl: '',
      status: 'published' as const,
      slug: '',
      metaTitle: '',
      metaDesc: '',
      sortOrder: 0,
    },
    {
      id: 'news-2',
      title: 'AWALIFE Participated in the ASASC',
      excerpt: 'AWALIFE announced participation in the Asian Small Animal Specialist Conference, demonstrating innovative diagnostic solutions for veterinary practices.',
      content: '',
      date: '2024-10-15',
      category: 'Events',
      location: 'Bangkok, Thailand',
      imageUrl: '',
      status: 'published' as const,
      slug: '',
      metaTitle: '',
      metaDesc: '',
      sortOrder: 0,
    },
    {
      id: 'news-3',
      title: 'Singapore Vet Show Success',
      excerpt: 'Singapore VetShow 2024 was a tremendous success for AWALIFE, connecting with Asia\'s premier veterinary professionals and showcasing our latest innovations.',
      content: '',
      date: '2024-10-08',
      category: 'Events',
      location: 'Singapore',
      imageUrl: '',
      status: 'published' as const,
      slug: '',
      metaTitle: '',
      metaDesc: '',
      sortOrder: 0,
    },
    {
      id: 'news-4',
      title: 'New AI-100Vet Firmware Update',
      excerpt: 'We are pleased to announce a major firmware update for the AI-100Vet analyzer, introducing enhanced blood cell recognition accuracy and faster processing times.',
      content: '',
      date: '2024-09-20',
      category: 'Product Updates',
      location: 'Shenzhen, China',
      imageUrl: '',
      status: 'published' as const,
      slug: '',
      metaTitle: '',
      metaDesc: '',
      sortOrder: 0,
    },
    {
      id: 'news-5',
      title: 'AWALIFE Expands European Distribution',
      excerpt: 'AWALIFE announces new distribution partnerships across Germany, France, and Spain, bringing AI-powered veterinary diagnostics to more European clinics.',
      content: '',
      date: '2024-08-15',
      category: 'Company News',
      location: 'Europe',
      imageUrl: '',
      status: 'published' as const,
      slug: '',
      metaTitle: '',
      metaDesc: '',
      sortOrder: 0,
    },
    {
      id: 'news-6',
      title: 'Training Workshop for Distributors',
      excerpt: 'AWALIFE hosted an intensive training workshop for our global distributor partners, covering product features, maintenance, and customer support best practices.',
      content: '',
      date: '2024-07-10',
      category: 'Company News',
      location: 'Shenzhen, China',
      imageUrl: '',
      status: 'published' as const,
      slug: '',
      metaTitle: '',
      metaDesc: '',
      sortOrder: 0,
    },
  ],
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
  if (!isString(data.cta.buttonLabel) || !isString(data.cta.buttonUrl)) {
    return false;
  }
  // News is optional for backward compat - default to empty array
  if (data.news !== undefined && !Array.isArray(data.news)) {
    return false;
  }
  return true;
};
