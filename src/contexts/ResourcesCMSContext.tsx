import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getDefaultResourcesData, isResourcesCMSData, ResourcesCMSData } from '@/data/resources';

type ResourcesCMSContextType = {
  data: ResourcesCMSData;
  setData: React.Dispatch<React.SetStateAction<ResourcesCMSData>>;
  resetData: () => void;
};

const ResourcesCMSContext = createContext<ResourcesCMSContextType | undefined>(undefined);

const STORAGE_KEY = 'awaaq-resources-cms-v1';

const loadResourcesData = (): ResourcesCMSData => {
  if (typeof window === 'undefined') {
    return getDefaultResourcesData();
  }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return getDefaultResourcesData();
    }
    const parsed = JSON.parse(saved) as unknown;
    if (!isResourcesCMSData(parsed)) {
      return getDefaultResourcesData();
    }
    const defaults = getDefaultResourcesData();
    // Backward compat: add news array if missing
    return {
      ...parsed,
      news: Array.isArray((parsed as ResourcesCMSData).news) ? (parsed as ResourcesCMSData).news : defaults.news,
    };
  } catch {
    return getDefaultResourcesData();
  }
};

export const ResourcesCMSProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ResourcesCMSData>(() => loadResourcesData());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      return;
    }
  }, [data]);

  const resetData = () => {
    setData(getDefaultResourcesData());
  };

  return (
    <ResourcesCMSContext.Provider value={{ data, setData, resetData }}>
      {children}
    </ResourcesCMSContext.Provider>
  );
};

export const useResourcesCMS = () => {
  const context = useContext(ResourcesCMSContext);
  if (!context) {
    throw new Error('useResourcesCMS must be used within a ResourcesCMSProvider');
  }
  return context;
};
