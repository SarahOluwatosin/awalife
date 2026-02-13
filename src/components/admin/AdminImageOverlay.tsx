import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/contexts/AuthContext';
import { uploadAndReplace } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';
import { Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_PATH_MARKER = '/storage/v1/object/public/media/assets/';

function extractStoragePath(src: string): string | null {
  const idx = src.indexOf(STORAGE_PATH_MARKER);
  if (idx === -1) return null;
  let path = src.substring(idx + STORAGE_PATH_MARKER.length);
  // Strip query params
  const qIdx = path.indexOf('?');
  if (qIdx !== -1) path = path.substring(0, qIdx);
  return path;
}

const AdminImageOverlay = () => {
  const { isAdmin } = useAuth();
  const [target, setTarget] = useState<{ el: HTMLImageElement; rect: DOMRect } | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeElRef = useRef<HTMLImageElement | null>(null);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const el = (e.target as HTMLElement).closest?.('img') as HTMLImageElement | null;
    if (!el || !el.src || !extractStoragePath(el.src)) {
      return;
    }
    const rect = el.getBoundingClientRect();
    if (rect.width < 30 || rect.height < 30) return;
    activeElRef.current = el;
    setTarget({ el, rect });
  }, []);

  const handleMouseOutWindow = useCallback((e: MouseEvent) => {
    const related = e.relatedTarget as Node | null;
    if (!related || !document.body.contains(related)) {
      setTarget(null);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOutWindow, true);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOutWindow, true);
    };
  }, [isAdmin, handleMouseOver, handleMouseOutWindow]);

  // Update rect on scroll/resize
  useEffect(() => {
    if (!target) return;
    const update = () => {
      if (activeElRef.current && document.body.contains(activeElRef.current)) {
        setTarget(prev => prev ? { ...prev, rect: activeElRef.current!.getBoundingClientRect() } : null);
      } else {
        setTarget(null);
      }
    };
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [target]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeElRef.current) return;

    const path = extractStoragePath(activeElRef.current.src);
    if (!path) return;

    setUploading(true);
    try {
      const newUrl = await uploadAndReplace('media', `assets/${path}`, file);
      // Update all matching images on the page
      document.querySelectorAll<HTMLImageElement>('img').forEach(img => {
        const imgPath = extractStoragePath(img.src);
        if (imgPath === path) {
          img.src = newUrl;
        }
      });
      toast({ title: 'Image replaced successfully' });
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!isAdmin || !target) return null;

  return createPortal(
    <>
      <Button
        size="icon"
        variant="secondary"
        className="fixed z-[9999] shadow-lg"
        style={{
          top: target.rect.top + 8,
          left: target.rect.right - 44,
          pointerEvents: 'auto',
        }}
        onClick={handleClick}
        disabled={uploading}
        onMouseOver={e => e.stopPropagation()}
      >
        {uploading ? <Loader2 className="animate-spin" /> : <Camera />}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </>,
    document.body
  );
};

export default AdminImageOverlay;
