import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useMediaOverrides } from '@/contexts/MediaOverrideContext';
import { uploadAndReplace, uploadToStorage } from '@/lib/storage';
import { validateVideoFile, validateVideoUrl } from '@/lib/validation';
import { toast } from '@/hooks/use-toast';
import { Camera, Loader2, Upload, ImageIcon, Video, Link, Play, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_PATH_MARKER = '/storage/v1/object/public/media/';
const STORAGE_MEDIA_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media`;
const STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media/assets`;

type SiteImage = { id: string; key: string; label: string; category: string; file_name: string };

function extractStoragePath(src: string): string | null {
  const idx = src.indexOf(STORAGE_PATH_MARKER);
  if (idx === -1) return null;
  let path = src.substring(idx + STORAGE_PATH_MARKER.length);
  const qIdx = path.indexOf('?');
  if (qIdx !== -1) path = path.substring(0, qIdx);
  return path;
}

function isLogoImage(path: string): boolean {
  return /logo/i.test(path);
}

function getEmbedPreviewUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

const AdminImageOverlay = () => {
  const { isAdmin } = useAuth();
  const { overrides, refresh: refreshOverrides } = useMediaOverrides();
  const [target, setTarget] = useState<{ el: HTMLImageElement; rect: DOMRect } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [siteImages, setSiteImages] = useState<SiteImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const activeElRef = useRef<HTMLImageElement | null>(null);
  const activePath = activeElRef.current ? extractStoragePath(activeElRef.current.src) : null;
  const isLogo = activePath ? isLogoImage(activePath) : false;
  const currentOverride = activePath ? overrides.get(activePath) : undefined;

  // Video embed state
  const [videoEmbedUrl, setVideoEmbedUrl] = useState('');
  // Existing videos from DB
  type SiteVideo = { id: string; key: string; label: string; category: string; video_url: string; video_type: string; thumbnail_url: string };
  const [siteVideos, setSiteVideos] = useState<SiteVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    if (dialogOpen) return;
    const target = e.target as HTMLElement;
    // Try the element itself or ancestors first
    let el = target.closest?.('img') as HTMLImageElement | null;
    // If not found, check if we're hovering over a container that has an img child
    if (!el) {
      el = target.querySelector?.('img') as HTMLImageElement | null;
    }
    if (!el || !el.src || !extractStoragePath(el.src)) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 30 || rect.height < 30) return;
    activeElRef.current = el;
    setTarget({ el, rect });
  }, [dialogOpen]);

  const handleMouseOutWindow = useCallback((e: MouseEvent) => {
    if (dialogOpen) return;
    const related = e.relatedTarget as Node | null;
    if (!related || !document.body.contains(related)) {
      setTarget(null);
    }
  }, [dialogOpen]);

  useEffect(() => {
    if (!isAdmin) return;
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOutWindow, true);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOutWindow, true);
    };
  }, [isAdmin, handleMouseOver, handleMouseOutWindow]);

  useEffect(() => {
    if (!target || dialogOpen) return;
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
  }, [target, dialogOpen]);

  const fetchSiteImages = async () => {
    setLoadingImages(true);
    const { data } = await supabase.from('site_images').select('*').order('category');
    setSiteImages((data as SiteImage[]) || []);
    setLoadingImages(false);
  };

  const fetchSiteVideos = async () => {
    setLoadingVideos(true);
    const { data } = await supabase.from('site_videos').select('*').order('category');
    setSiteVideos((data as any[]) || []);
    setLoadingVideos(false);
  };

  const openDialog = () => {
    setDialogOpen(true);
    setVideoEmbedUrl('');
    fetchSiteImages();
    fetchSiteVideos();
  };

  const refreshAllMatching = (path: string, newUrl: string) => {
    document.querySelectorAll<HTMLImageElement>('img').forEach(img => {
      const imgPath = extractStoragePath(img.src);
      if (imgPath === path) img.src = newUrl;
    });
  };

  const syncSiteImageRecord = async (storagePath: string) => {
    // Try matching by full path first, then just the basename
    const baseName = storagePath.includes('/') ? storagePath.split('/').pop()! : storagePath;
    const { data: existing } = await supabase.from('site_images').select('id')
      .or(`file_name.eq.${storagePath},file_name.eq.${baseName}`)
      .maybeSingle();
    if (existing) {
      await supabase.from('site_images').update({ updated_at: new Date().toISOString() }).eq('id', existing.id);
    } else {
      const label = baseName.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      await supabase.from('site_images').insert({ key: baseName.replace(/\.[^.]+$/, '').replace(/[-_ ]/g, ''), label, file_name: storagePath, category: 'Uncategorized' });
    }
  };

  // Remove any video override, restoring the original image
  const handleRevertToImage = async () => {
    if (!activePath) return;
    setUploading(true);
    try {
      await supabase.from('site_media_overrides').delete().eq('storage_path', activePath);
      await refreshOverrides();
      toast({ title: 'Reverted to original image. Refresh the page to see changes.' });
      setDialogOpen(false);
      setTarget(null);
    } catch (err: any) {
      toast({ title: 'Failed to revert', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleLocalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activePath) return;
    setUploading(true);
    try {
      // Remove any video override when replacing with image
      await supabase.from('site_media_overrides').delete().eq('storage_path', activePath);
      const newUrl = await uploadAndReplace('media', activePath, file);
      refreshAllMatching(activePath, newUrl);
      await syncSiteImageRecord(activePath);
      await refreshOverrides();
      toast({ title: 'Image replaced successfully' });
      setDialogOpen(false);
      setTarget(null);
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handlePickExisting = async (img: SiteImage) => {
    if (!activePath || activePath === img.file_name || activePath === `assets/${img.file_name}`) return;
    setUploading(true);
    try {
      await supabase.from('site_media_overrides').delete().eq('storage_path', activePath);
      const sourceUrl = `${STORAGE_BASE}/${img.file_name}`;
      const res = await fetch(sourceUrl);
      if (!res.ok) throw new Error('Failed to fetch source image');
      const blob = await res.blob();
      const file = new File([blob], img.file_name, { type: blob.type });
      const newUrl = await uploadAndReplace('media', activePath, file);
      refreshAllMatching(activePath, newUrl);
      await syncSiteImageRecord(activePath);
      await refreshOverrides();
      toast({ title: `Replaced with "${img.label}"` });
      setDialogOpen(false);
      setTarget(null);
    } catch (err: any) {
      toast({ title: 'Replace failed', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  // Video embed handler
  const handleVideoEmbed = async () => {
    if (!activePath) return;
    const error = validateVideoUrl(videoEmbedUrl);
    if (error) { toast({ title: error, variant: 'destructive' }); return; }
    setUploading(true);
    try {
      let thumbnailUrl = '';
      const ytMatch = videoEmbedUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (ytMatch) thumbnailUrl = `https://img.youtube.com/vi/${ytMatch[1]}/mqdefault.jpg`;

      await supabase.from('site_media_overrides').upsert({
        storage_path: activePath,
        media_type: 'video_embed',
        media_url: videoEmbedUrl.trim(),
        thumbnail_url: thumbnailUrl,
      }, { onConflict: 'storage_path' });

      await refreshOverrides();
      toast({ title: 'Replaced with video embed. Refresh the page to see changes.' });
      setDialogOpen(false);
      setTarget(null);
    } catch (err: any) {
      toast({ title: 'Failed to set video', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  // Video upload handler
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activePath) return;
    const vError = validateVideoFile(file);
    if (vError) { toast({ title: vError, variant: 'destructive' }); return; }
    setUploading(true);
    try {
      const videoUrl = await uploadToStorage('media', 'videos', file);
      await supabase.from('site_media_overrides').upsert({
        storage_path: activePath,
        media_type: 'video_upload',
        media_url: videoUrl,
        thumbnail_url: '',
      }, { onConflict: 'storage_path' });

      await refreshOverrides();
      toast({ title: 'Replaced with uploaded video. Refresh the page to see changes.' });
      setDialogOpen(false);
      setTarget(null);
    } catch (err: any) {
      toast({ title: 'Video upload failed', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
      if (videoFileInputRef.current) videoFileInputRef.current.value = '';
    }
  };

  if (!isAdmin) return null;

  const grouped = siteImages.reduce<Record<string, SiteImage[]>>((acc, img) => {
    (acc[img.category] ||= []).push(img);
    return acc;
  }, {});

  return (
    <>
      {target && !dialogOpen && createPortal(
        <Button
          size="icon"
          variant="secondary"
          className="fixed z-[9999] shadow-lg"
          style={{ top: target.rect.top + 8, left: target.rect.right - 44, pointerEvents: 'auto' }}
          onClick={openDialog}
          onMouseOver={e => e.stopPropagation()}
        >
          <Camera />
        </Button>,
        document.body
      )}

      <Dialog open={dialogOpen} onOpenChange={open => { setDialogOpen(open); if (!open) setTarget(null); }}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Replace Media</DialogTitle>
            <DialogDescription>
              Replace with an image{!isLogo && ', video embed, or uploaded video'}.
            </DialogDescription>
          </DialogHeader>

          {activePath && (
            <div className="mb-3 rounded-md border p-2 bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">
                Current {currentOverride ? (currentOverride.media_type === 'video_embed' ? 'video embed' : 'uploaded video') : 'image'}
              </p>
              {currentOverride ? (
                <div className="flex flex-col items-center gap-2">
                  {currentOverride.media_type === 'video_embed' && getEmbedPreviewUrl(currentOverride.media_url) ? (
                    <div className="w-full aspect-video rounded overflow-hidden">
                      <iframe src={getEmbedPreviewUrl(currentOverride.media_url)!} className="w-full h-full" title="Current video" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Video className="h-5 w-5" />
                      <span className="text-xs truncate">{currentOverride.media_url}</span>
                    </div>
                  )}
                  <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={handleRevertToImage} disabled={uploading}>
                    <Undo2 className="h-3 w-3" /> Revert to Image
                  </Button>
                </div>
              ) : (
                <>
                  <img src={`${STORAGE_MEDIA_BASE}/${activePath}?t=${Date.now()}`} alt="Current" className="max-h-32 mx-auto rounded object-contain" />
                  <p className="text-xs text-muted-foreground text-center mt-1 break-all">{activePath}</p>
                </>
              )}
            </div>
          )}

          <Tabs defaultValue="existing">
            <TabsList className="w-full">
              <TabsTrigger value="existing" className="flex-1 gap-1"><ImageIcon className="h-3 w-3" /> Images</TabsTrigger>
              <TabsTrigger value="upload" className="flex-1 gap-1"><Upload className="h-3 w-3" /> Upload</TabsTrigger>
              {!isLogo && (
                <TabsTrigger value="video" className="flex-1 gap-1"><Video className="h-3 w-3" /> Video</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="existing" className="mt-3 space-y-4">
              {loadingImages ? (
                <div className="flex justify-center py-8"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
              ) : Object.entries(grouped).map(([cat, imgs]) => (
                <div key={cat}>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">{cat}</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {imgs.map(img => (
                      <button
                        key={img.id}
                        onClick={() => handlePickExisting(img)}
                        disabled={uploading || img.file_name === activePath || `assets/${img.file_name}` === activePath}
                        className="group relative rounded-md border p-1 hover:border-primary transition-colors disabled:opacity-40 bg-background"
                      >
                        <img
                          src={`${STORAGE_BASE}/${img.file_name}?t=preview`}
                          alt={img.label}
                          className="h-16 w-full object-contain rounded"
                          loading="lazy"
                        />
                        <span className="block text-[10px] text-muted-foreground truncate mt-1">{img.label}</span>
                        {(img.file_name === activePath || `assets/${img.file_name}` === activePath) && (
                          <span className="absolute inset-0 flex items-center justify-center bg-background/70 rounded-md text-[10px] font-medium">Current</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="upload" className="mt-3">
              <div className="flex flex-col items-center gap-3 py-6">
                <Button onClick={() => fileInputRef.current?.click()} disabled={uploading} variant="outline" className="gap-2">
                  {uploading ? <Loader2 className="animate-spin" /> : <Upload className="h-4 w-4" />}
                  {uploading ? 'Uploading…' : 'Choose Image File'}
                </Button>
                <p className="text-xs text-muted-foreground">Select an image file to replace the current one</p>
              </div>
            </TabsContent>

            {!isLogo && (
              <TabsContent value="video" className="mt-3 space-y-4">
                {/* Pick from existing videos */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground">Existing Videos</Label>
                  {loadingVideos ? (
                    <div className="flex justify-center py-4"><Loader2 className="animate-spin h-5 w-5 text-muted-foreground" /></div>
                  ) : siteVideos.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-3">No videos in database yet</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {siteVideos.map(vid => (
                        <button
                          key={vid.id}
                          disabled={uploading}
                          onClick={async () => {
                            if (!activePath) return;
                            setUploading(true);
                            try {
                              const mediaType = vid.video_type === 'embed' ? 'video_embed' : 'video_upload';
                              await supabase.from('site_media_overrides').upsert({
                                storage_path: activePath,
                                media_type: mediaType,
                                media_url: vid.video_url,
                                thumbnail_url: vid.thumbnail_url || '',
                              }, { onConflict: 'storage_path' });
                              await refreshOverrides();
                              toast({ title: `Replaced with "${vid.label}". Refresh to see changes.` });
                              setDialogOpen(false);
                              setTarget(null);
                            } catch (err: any) {
                              toast({ title: 'Failed', description: err.message, variant: 'destructive' });
                            } finally {
                              setUploading(false);
                            }
                          }}
                          className="group relative rounded-md border p-2 hover:border-primary transition-colors disabled:opacity-40 bg-background text-left"
                        >
                          <div className="flex items-center gap-2">
                            <Play className="h-4 w-4 shrink-0 text-primary" />
                            <div className="min-w-0">
                              <span className="block text-xs font-medium truncate">{vid.label}</span>
                              <span className="block text-[10px] text-muted-foreground truncate">{vid.category} · {vid.video_type}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">or embed a URL</span></div>
                </div>

                {/* Video Embed */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground">Embed URL (YouTube, Vimeo)</Label>
                    <div className="flex gap-2">
                      <Input
                        value={videoEmbedUrl}
                        onChange={e => setVideoEmbedUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="flex-1"
                      />
                      <Button onClick={handleVideoEmbed} disabled={uploading || !videoEmbedUrl.trim()} size="sm">
                        {uploading ? <Loader2 className="animate-spin h-4 w-4" /> : <Link className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  {videoEmbedUrl && getEmbedPreviewUrl(videoEmbedUrl) && (
                    <div className="aspect-video rounded-lg overflow-hidden border border-border">
                      <iframe src={getEmbedPreviewUrl(videoEmbedUrl)!} className="w-full h-full" allowFullScreen title="Preview" />
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">or</span></div>
                </div>

                {/* Video Upload */}
                <div className="flex flex-col items-center gap-3 py-4">
                  <Button onClick={() => videoFileInputRef.current?.click()} disabled={uploading} variant="outline" className="gap-2">
                    {uploading ? <Loader2 className="animate-spin" /> : <Upload className="h-4 w-4" />}
                    {uploading ? 'Uploading…' : 'Upload Video File'}
                  </Button>
                  <p className="text-xs text-muted-foreground">MP4, WebM, OGG (max 20MB)</p>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </DialogContent>
      </Dialog>

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLocalUpload} />
      <input ref={videoFileInputRef} type="file" accept="video/mp4,video/webm,video/ogg" className="hidden" onChange={handleVideoUpload} />
    </>
  );
};

export default AdminImageOverlay;
