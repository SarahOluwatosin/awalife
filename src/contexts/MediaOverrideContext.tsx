import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_PATH_MARKER = '/storage/v1/object/public/media/';

type MediaOverride = {
  storage_path: string;
  media_type: 'image' | 'video_upload' | 'video_embed';
  media_url: string;
  thumbnail_url: string;
};

type MediaOverrideContextType = {
  overrides: Map<string, MediaOverride>;
  refresh: () => Promise<void>;
};

const MediaOverrideContext = createContext<MediaOverrideContextType>({
  overrides: new Map(),
  refresh: async () => {},
});

function extractStoragePath(src: string): string | null {
  const idx = src.indexOf(STORAGE_PATH_MARKER);
  if (idx === -1) return null;
  let path = src.substring(idx + STORAGE_PATH_MARKER.length);
  const qIdx = path.indexOf('?');
  if (qIdx !== -1) path = path.substring(0, qIdx);
  return path;
}

function getEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

function createVideoElement(override: MediaOverride, originalImg: HTMLImageElement): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('data-media-override', override.storage_path);
  wrapper.style.cssText = originalImg.style.cssText;
  // Copy relevant classes
  wrapper.className = originalImg.className;
  wrapper.style.position = 'relative';
  wrapper.style.overflow = 'hidden';

  if (override.media_type === 'video_embed') {
    const embedUrl = getEmbedUrl(override.media_url);
    if (embedUrl) {
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.className = 'w-full h-full absolute inset-0';
      iframe.style.border = 'none';
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'autoplay; encrypted-media');
      wrapper.style.aspectRatio = originalImg.style.aspectRatio || '16/9';
      wrapper.appendChild(iframe);
    }
  } else {
    const video = document.createElement('video');
    video.src = override.media_url;
    video.className = 'w-full h-full object-cover';
    video.controls = false;
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    if (override.thumbnail_url) video.poster = override.thumbnail_url;
    wrapper.appendChild(video);
  }

  return wrapper;
}

export const MediaOverrideProvider = ({ children }: { children: ReactNode }) => {
  const [overrides, setOverrides] = useState<Map<string, MediaOverride>>(new Map());
  const appliedRef = useRef<Set<string>>(new Set());

  const fetchOverrides = useCallback(async () => {
    const { data } = await supabase
      .from('site_media_overrides')
      .select('*');
    
    if (data) {
      const map = new Map<string, MediaOverride>();
      data.forEach((row: any) => {
        map.set(row.storage_path, {
          storage_path: row.storage_path,
          media_type: row.media_type,
          media_url: row.media_url,
          thumbnail_url: row.thumbnail_url,
        });
      });
      setOverrides(map);
    }
  }, []);

  useEffect(() => {
    fetchOverrides();
  }, [fetchOverrides]);

  // Apply DOM overrides when overrides change or after navigation
  useEffect(() => {
    // Clear applied tracking whenever overrides change so new ones take effect
    appliedRef.current.clear();

    // Also remove stale video wrappers whose override was removed
    document.querySelectorAll<HTMLElement>('[data-media-override]').forEach(wrapper => {
      const path = wrapper.getAttribute('data-media-override');
      if (path && !overrides.has(path)) {
        // Override was removed — we can't easily restore the img, but at least clean up
        wrapper.remove();
      }
    });

    if (overrides.size === 0) return;

    const applyOverrides = () => {
      document.querySelectorAll<HTMLImageElement>('img').forEach(img => {
        // Skip images inside components that handle overrides natively (e.g. ProductGallery)
        if (img.closest('[data-media-managed]')) return;
        // Skip images already replaced by a video override wrapper
        if (img.closest('[data-media-override]')) return;
        
        // Prefer data-override-id over storage path for independent per-section overrides
        const overrideId = img.getAttribute('data-override-id');
        const storagePath = extractStoragePath(img.src);
        const key = overrideId || storagePath;
        if (!key) return;
        // Never apply overrides to images that are themselves override URLs
        if (!overrideId && storagePath?.startsWith('assets/overrides/')) return;
        const override = overrides.get(key);
        if (!override) return;

        // For image overrides, just swap the src (non-destructive)
        if (override.media_type === 'image') {
          const overrideUrl = override.media_url;
          // Avoid re-applying if already set
          if (img.src === overrideUrl || img.src.startsWith(overrideUrl + '?')) return;
          img.src = overrideUrl;
          return;
        }

        // Don't apply video replacement twice
        if (img.parentElement?.getAttribute('data-media-override') === key) return;
        if (appliedRef.current.has(key)) return;

        const videoEl = createVideoElement(override, img);
        img.parentElement?.replaceChild(videoEl, img);
        appliedRef.current.add(key);
      });
    };

    // Apply immediately for fast image swaps, then observe for new elements
    applyOverrides();
    
    // Debounced observer to catch dynamically added images
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(applyOverrides, 200);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      observer.disconnect();
    };
  }, [overrides]);

  // Reset applied ref on navigation
  useEffect(() => {
    const handleNav = () => { appliedRef.current.clear(); };
    window.addEventListener('popstate', handleNav);
    return () => window.removeEventListener('popstate', handleNav);
  }, []);

  return (
    <MediaOverrideContext.Provider value={{ overrides, refresh: fetchOverrides }}>
      {children}
    </MediaOverrideContext.Provider>
  );
};

export const useMediaOverrides = () => useContext(MediaOverrideContext);
