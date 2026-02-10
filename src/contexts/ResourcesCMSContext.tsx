import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getDefaultResourcesData } from '@/data/resources';
import type { ResourcesCMSData, ResourceItem, ResourceFAQItem, NewsItem } from '@/data/resources';

type ResourcesCMSContextType = {
  data: ResourcesCMSData;
  loading: boolean;
  refetch: () => Promise<void>;
  // News CRUD
  addNews: (item: Omit<NewsItem, 'id'>) => Promise<void>;
  updateNews: (item: NewsItem) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  // Resources CRUD
  addResource: (item: Omit<ResourceItem, 'id'>) => Promise<void>;
  updateResource: (item: ResourceItem) => Promise<void>;
  deleteResource: (id: string) => Promise<void>;
  // FAQ CRUD
  addFaq: (item: Omit<ResourceFAQItem, 'id'>) => Promise<void>;
  updateFaq: (item: ResourceFAQItem) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
};

const ResourcesCMSContext = createContext<ResourcesCMSContextType | undefined>(undefined);

export const ResourcesCMSProvider = ({ children }: { children: ReactNode }) => {
  const defaults = getDefaultResourcesData();
  const [data, setData] = useState<ResourcesCMSData>(defaults);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    const [newsRes, resourcesRes, faqRes] = await Promise.all([
      supabase.from('news_articles').select('*').order('date', { ascending: false }),
      supabase.from('resources').select('*').order('created_at', { ascending: false }),
      supabase.from('faq_items').select('*').order('sort_order', { ascending: true }),
    ]);

    const news: NewsItem[] = (newsRes.data ?? []).map(r => ({
      id: r.id,
      title: r.title,
      excerpt: r.excerpt,
      content: r.content,
      date: r.date,
      category: r.category as NewsItem['category'],
      location: r.location,
      imageUrl: r.image_url,
    }));

    const resources: ResourceItem[] = (resourcesRes.data ?? []).map(r => ({
      id: r.id,
      title: r.title,
      summary: r.summary,
      kind: r.kind as ResourceItem['kind'],
      productId: r.product_id as ResourceItem['productId'],
      mediaType: r.media_type as ResourceItem['mediaType'],
      mediaUrl: r.media_url,
      mediaName: r.media_name,
      mediaMime: r.media_mime,
    }));

    const faqItems: ResourceFAQItem[] = (faqRes.data ?? []).map(r => ({
      id: r.id,
      question: r.question,
      answer: r.answer,
    }));

    setData(prev => ({
      ...prev,
      news,
      resources,
      faq: { ...prev.faq, items: faqItems },
    }));
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // News CRUD
  const addNews = async (item: Omit<NewsItem, 'id'>) => {
    await supabase.from('news_articles').insert({
      title: item.title, excerpt: item.excerpt, content: item.content,
      date: item.date, category: item.category, location: item.location, image_url: item.imageUrl,
    });
    await fetchAll();
  };

  const updateNews = async (item: NewsItem) => {
    await supabase.from('news_articles').update({
      title: item.title, excerpt: item.excerpt, content: item.content,
      date: item.date, category: item.category, location: item.location, image_url: item.imageUrl,
    }).eq('id', item.id);
    await fetchAll();
  };

  const deleteNews = async (id: string) => {
    await supabase.from('news_articles').delete().eq('id', id);
    await fetchAll();
  };

  // Resources CRUD
  const addResource = async (item: Omit<ResourceItem, 'id'>) => {
    await supabase.from('resources').insert({
      title: item.title, summary: item.summary, kind: item.kind,
      product_id: item.productId, media_type: item.mediaType,
      media_url: item.mediaUrl, media_name: item.mediaName, media_mime: item.mediaMime,
    });
    await fetchAll();
  };

  const updateResource = async (item: ResourceItem) => {
    await supabase.from('resources').update({
      title: item.title, summary: item.summary, kind: item.kind,
      product_id: item.productId, media_type: item.mediaType,
      media_url: item.mediaUrl, media_name: item.mediaName, media_mime: item.mediaMime,
    }).eq('id', item.id);
    await fetchAll();
  };

  const deleteResource = async (id: string) => {
    await supabase.from('resources').delete().eq('id', id);
    await fetchAll();
  };

  // FAQ CRUD
  const addFaq = async (item: Omit<ResourceFAQItem, 'id'>) => {
    const maxOrder = data.faq.items.length;
    await supabase.from('faq_items').insert({
      question: item.question, answer: item.answer, sort_order: maxOrder,
    });
    await fetchAll();
  };

  const updateFaq = async (item: ResourceFAQItem) => {
    await supabase.from('faq_items').update({
      question: item.question, answer: item.answer,
    }).eq('id', item.id);
    await fetchAll();
  };

  const deleteFaq = async (id: string) => {
    await supabase.from('faq_items').delete().eq('id', id);
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
