import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { dbSelect, dbInsert, dbUpdate, dbDelete } from '@/lib/db';
import { supabase } from '@/integrations/supabase/client';
import { getDefaultResourcesData } from '@/data/resources';
import type { ResourcesCMSData, ResourceItem, ResourceFAQItem, NewsItem } from '@/data/resources';
import { NewsItemSchema, ResourceItemSchema, FaqItemSchema } from '@/lib/validation';

type ResourcesCMSContextType = {
  data: ResourcesCMSData;
  loading: boolean;
  refetch: () => Promise<void>;
  addNews: (item: Omit<NewsItem, 'id'>) => Promise<void>;
  updateNews: (item: NewsItem) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  addResource: (item: Omit<ResourceItem, 'id'>) => Promise<void>;
  updateResource: (item: ResourceItem) => Promise<void>;
  deleteResource: (id: string) => Promise<void>;
  addFaq: (item: Omit<ResourceFAQItem, 'id'>) => Promise<void>;
  updateFaq: (item: ResourceFAQItem) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
};

const ResourcesCMSContext = createContext<ResourcesCMSContextType | undefined>(undefined);

const getToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? '';
};

export const ResourcesCMSProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ResourcesCMSData>({
    hero: getDefaultResourcesData().hero,
    resources: [],
    faq: { title: 'Frequently Asked Questions', items: [] },
    cta: getDefaultResourcesData().cta,
    news: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      const [newsRaw, resourcesRaw, faqRaw] = await Promise.all([
        dbSelect('news_articles', 'order=date.desc'),
        dbSelect('resources', 'order=created_at.desc'),
        dbSelect('faq_items', 'order=sort_order.asc'),
      ]);

      const news: NewsItem[] = (newsRaw as any[]).map(r => ({
        id: r.id, title: r.title, excerpt: r.excerpt, content: r.content,
        date: r.date, category: r.category, location: r.location, imageUrl: r.image_url,
        status: r.status ?? 'published', slug: r.slug ?? '', metaTitle: r.meta_title ?? '',
        metaDesc: r.meta_desc ?? '', sortOrder: r.sort_order ?? 0,
      }));

      const resources: ResourceItem[] = (resourcesRaw as any[]).map(r => ({
        id: r.id, title: r.title, summary: r.summary,
        kind: r.kind, productId: r.product_id, mediaType: r.media_type,
        mediaUrl: r.media_url, mediaName: r.media_name, mediaMime: r.media_mime,
      }));

      const faqItems: ResourceFAQItem[] = (faqRaw as any[]).map(r => ({
        id: r.id, question: r.question, answer: r.answer,
      }));

      setData(prev => ({
        ...prev,
        news,
        resources,
        faq: { ...prev.faq, items: faqItems },
      }));
    } catch (err) {
      console.error('[CMS] Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const addNews = async (item: Omit<NewsItem, 'id'>) => {
    const validated = NewsItemSchema.parse(item);
    const token = await getToken();
    await dbInsert('news_articles', {
      title: validated.title, excerpt: validated.excerpt, content: validated.content,
      date: validated.date, category: validated.category, location: validated.location, image_url: validated.imageUrl,
      status: validated.status, slug: validated.slug || null,
      meta_title: validated.metaTitle, meta_desc: validated.metaDesc, sort_order: validated.sortOrder,
    }, token);
    await fetchAll();
  };

  const updateNews = async (item: NewsItem) => {
    const validated = NewsItemSchema.parse(item);
    const token = await getToken();
    await dbUpdate('news_articles', item.id, {
      title: validated.title, excerpt: validated.excerpt, content: validated.content,
      date: validated.date, category: validated.category, location: validated.location, image_url: validated.imageUrl,
      status: validated.status, slug: validated.slug || null,
      meta_title: validated.metaTitle, meta_desc: validated.metaDesc, sort_order: validated.sortOrder,
    }, token);
    await fetchAll();
  };

  const deleteNews = async (id: string) => {
    const token = await getToken();
    await dbDelete('news_articles', id, token);
    await fetchAll();
  };

  const addResource = async (item: Omit<ResourceItem, 'id'>) => {
    const validated = ResourceItemSchema.parse(item);
    const token = await getToken();
    await dbInsert('resources', {
      title: validated.title, summary: validated.summary, kind: validated.kind,
      product_id: validated.productId, media_type: validated.mediaType,
      media_url: validated.mediaUrl, media_name: validated.mediaName, media_mime: validated.mediaMime,
    }, token);
    await fetchAll();
  };

  const updateResource = async (item: ResourceItem) => {
    const validated = ResourceItemSchema.parse(item);
    const token = await getToken();
    await dbUpdate('resources', item.id, {
      title: validated.title, summary: validated.summary, kind: validated.kind,
      product_id: validated.productId, media_type: validated.mediaType,
      media_url: validated.mediaUrl, media_name: validated.mediaName, media_mime: validated.mediaMime,
    }, token);
    await fetchAll();
  };

  const deleteResource = async (id: string) => {
    const token = await getToken();
    await dbDelete('resources', id, token);
    await fetchAll();
  };

  const addFaq = async (item: Omit<ResourceFAQItem, 'id'>) => {
    const validated = FaqItemSchema.parse(item);
    const token = await getToken();
    const maxOrder = data.faq.items.length;
    await dbInsert('faq_items', {
      question: validated.question, answer: validated.answer, sort_order: maxOrder,
    }, token);
    await fetchAll();
  };

  const updateFaq = async (item: ResourceFAQItem) => {
    const validated = FaqItemSchema.parse(item);
    const token = await getToken();
    await dbUpdate('faq_items', item.id, {
      question: validated.question, answer: validated.answer,
    }, token);
    await fetchAll();
  };

  const deleteFaq = async (id: string) => {
    const token = await getToken();
    await dbDelete('faq_items', id, token);
    await fetchAll();
  };

  return (
    <ResourcesCMSContext.Provider value={{
      data, loading, refetch: fetchAll,
      addNews, updateNews, deleteNews,
      addResource, updateResource, deleteResource,
      addFaq, updateFaq, deleteFaq,
    }}>
      {children}
    </ResourcesCMSContext.Provider>
  );
};

export const useResourcesCMS = () => {
  const context = useContext(ResourcesCMSContext);
  if (!context) throw new Error('useResourcesCMS must be used within a ResourcesCMSProvider');
  return context;
};
