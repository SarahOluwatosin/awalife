import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { dbSelect, dbUpdate } from '@/lib/db';
import { supabase } from '@/integrations/supabase/client';

type ContentRow = {
  id: string;
  page: string;
  section: string;
  key: string;
  label: string;
  value: string;
  type: string;
};

type PageContentContextType = {
  loading: boolean;
  getContent: (page: string, section: string, key: string, fallback?: string) => string;
  updateContent: (id: string, value: string) => Promise<void>;
  rows: ContentRow[];
  refetch: () => Promise<void>;
};

const PageContentContext = createContext<PageContentContextType | undefined>(undefined);

const getToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? '';
};

export const PageContentProvider = ({ children }: { children: ReactNode }) => {
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      const data = await dbSelect<ContentRow>('page_content', 'order=page.asc,section.asc,key.asc');
      setRows(data);
    } catch (err) {
      console.error('[PageContent] fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const getContent = (page: string, section: string, key: string, fallback = '') => {
    const row = rows.find(r => r.page === page && r.section === section && r.key === key);
    return row?.value ?? fallback;
  };

  const updateContent = async (id: string, value: string) => {
    const token = await getToken();
    await dbUpdate('page_content', id, { value }, token);
    setRows(prev => prev.map(r => r.id === id ? { ...r, value } : r));
  };

  return (
    <PageContentContext.Provider value={{ loading, getContent, updateContent, rows, refetch: fetchAll }}>
      {children}
    </PageContentContext.Provider>
  );
};

export const usePageContent = () => {
  const ctx = useContext(PageContentContext);
  if (!ctx) throw new Error('usePageContent must be used within a PageContentProvider');
  return ctx;
};
