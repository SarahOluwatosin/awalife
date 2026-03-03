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
  const [target, setTarget] = useState<{ el: HTMLElement; rect: DOMRect } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [siteImages, setSiteImages] = useState<SiteImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const activeElRef = useRef<HTMLElement | null>(null);
  const activePathRef = useRef<string | null>(null);
  const activePath = activePathRef.current;
  const isLogo = activePath ? isLogoImage(activePath) : false;
  const currentOverride = activePath ? overrides.get(activePath) : undefined;

  // Video embed state
  const [videoEmbedUrl, setVideoEmbedUrl] = useState('');
  // Existing videos from DB
  type SiteVideo = { id: string; key: string; label: string; category: string; video_url: string; video_type: string; thumbnail_url: string };
  const [siteVideos, setSiteVideos] = useState<SiteVideo[]>([]);
  type StorageVideo = { name: string; url: string };
  const [storageVideos, setStorageVideos] = useState<StorageVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    if (dialogOpen) return;
    const hovered = e.target as HTMLElement;

    // Check for video override wrappers (div[data-media-override])
    const overrideWrapper = hovered.closest?.('[data-media-override]') as HTMLElement | null;
    if (overrideWrapper) {
      const path = overrideWrapper.getAttribute('data-media-override');
      if (path) {
        const rect = overrideWrapper.getBoundingClientRect();
        if (rect.width < 30 || rect.height < 30) return;
        activeElRef.current = overrideWrapper;
        activePathRef.current = path;
        setTarget({ el: overrideWrapper, rect });
        return;
      }
    }

    // Check for regular images
    let el = hovered.closest?.('img') as HTMLImageElement | null;
    if (!el) {
      el = hovered.querySelector?.('img') as HTMLImageElement | null;
    }
    if (!el || !el.src) return;
    // ONLY allow overriding images that have a unique data-override-id
    const overrideId = el.getAttribute('data-override-id');
    if (!overrideId) return;
    const path = overrideId;
    const rect = el.getBoundingClientRect();
    if (rect.width < 30 || rect.height < 30) return;
    activeElRef.current = el;
    activePathRef.current = path;
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
    // Fetch from site_videos table
    const { data } = await supabase.from('site_videos').select('*').order('category');
    setSiteVideos((data as any[]) || []);
    // Scan multiple storage folders for video files
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov'];
    const folders = ['videos', 'assets'];
    const allVids: StorageVideo[] = [];
    for (const folder of folders) {
      const { data: storageFiles } = await supabase.storage.from('media').list(folder);
      if (storageFiles) {
        storageFiles
          .filter(f => videoExtensions.some(ext => f.name.toLowerCase().endsWith(`.${ext}`)))
          .forEach(f => {
            allVids.push({
              name: f.name,
              url: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media/${folder}/${f.name}`,
            });
          });
      }
    }
    setStorageVideos(allVids);
    setLoadingVideos(false);
  };

  const openDialog = () => {
    setDialogOpen(true);
    setVideoEmbedUrl('');
    fetchSiteImages();
    fetchSiteVideos();
  };

  const refreshAllMatching = (overrideId: string, newUrl: string) => {
    const bustUrl = newUrl.includes('?') ? newUrl : `${newUrl}?t=${Date.now()}`;
    // Only match by data-override-id — fully isolated per-instance
    document.querySelectorAll<HTMLImageElement>('img').forEach(img => {
      if (img.getAttribute('data-override-id') === overrideId) {
        img.src = bustUrl;
        img.removeAttribute('srcset');
      }
    });
    // Remove any video override wrappers for this path
    document.querySelectorAll<HTMLElement>(`[data-media-override="${overrideId}"]`).forEach(wrapper => {
      wrapper.remove();
    });
  };

  // storagePath = the data-override-id (e.g. "blood-overview")
  // mediaUrl    = the actual uploaded/selected public URL (used to derive file_name)
  const syncSiteImageRecord = async (storagePath: string, mediaUrl: string) => {
    // Extract the path relative to the media bucket from the public URL
    const marker = '/storage/v1/object/public/media/';
    const idx = mediaUrl.indexOf(marker);
    const filePath = idx !== -1
      ? mediaUrl.substring(idx + marker.length).split('?')[0]
      : storagePath;
    const baseName = filePath.split('/').pop() || storagePath;

    // Look for an existing record keyed to this override ID
    const { data: existing } = await supabase.from('site_images').select('id')
      .eq('key', storagePath)
      .maybeSingle();
    if (existing) {
      await supabase.from('site_images').update({ file_name: filePath, updated_at: new Date().toISOString() }).eq('id', existing.id);
    } else {
      const label = baseName.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      await supabase.from('site_images').insert({
        key: storagePath,
        label,
        file_name: filePath,
        category: 'Uncategorized',
      });
    }
  };

  // Remove any override, restoring the original asset
  const handleRevertToImage = async () => {
    if (!activePath) return;
    const wasVideo = currentOverride && currentOverride.media_type !== 'image';
    setUploading(true);
    try {
      await supabase.from('site_media_overrides').delete().eq('storage_path', activePath);
      await refreshOverrides();
      if (wasVideo) {
        toast({ title: 'Reverted to original. Page will reload.' });
        setDialogOpen(false);
        setTarget(null);
        activePathRef.current = null;
        setTimeout(() => window.location.reload(), 500);
      } else {
        // For image overrides, restore original src by reloading the page
        // since the original src is stored in the component's JSX, not in the override
        toast({ title: 'Reverted to original image. Refreshing...' });
        setDialogOpen(false);
        setTarget(null);
        activePathRef.current = null;
        setTimeout(() => window.location.reload(), 500);
        setDialogOpen(false);
        setTarget(null);
        activePathRef.current = null;
      }
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
      // Optimistically show uploaded image immediately via object URL
      const previewUrl = URL.createObjectURL(file);
      refreshAllMatching(activePath, previewUrl);

      // Upload to a unique path instead of overwriting the original file
      const newUrl = await uploadToStorage('media', 'assets/overrides', file);
      // Create an image override entry so original file is preserved
      await supabase.from('site_media_overrides').upsert({
        storage_path: activePath,
        media_type: 'image',
        media_url: newUrl,
        thumbnail_url: '',
      }, { onConflict: 'storage_path' });

      await syncSiteImageRecord(activePath, newUrl);
      await refreshOverrides();
      // Update with final URL
      refreshAllMatching(activePath, newUrl);
      toast({ title: 'Image replaced successfully' });
      setDialogOpen(false);
      setTarget(null);
      activePathRef.current = null;
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err.message, variant: 'destructive' });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setUploading(false);
    }
  };

  const handlePickExisting = async (img: SiteImage) => {
    if (!activePath || activePath === img.file_name || activePath === `assets/${img.file_name}`) return;
    setUploading(true);
    try {
      // Create an image override pointing to the selected library image
      const imageUrl = `${STORAGE_BASE}/${img.file_name}`;
      // Show immediately
      refreshAllMatching(activePath, imageUrl);

      await supabase.from('site_media_overrides').upsert({
        storage_path: activePath,
        media_type: 'image',
        media_url: imageUrl,
        thumbnail_url: '',
      }, { onConflict: 'storage_path' });

      await syncSiteImageRecord(activePath, imageUrl);
      await refreshOverrides();
      toast({ title: `Replaced with "${img.label}"` });
      setDialogOpen(false);
      setTarget(null);
      activePathRef.current = null;
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

      <Dialog open={dialogOpen} onOpenChange={open => { setDialogOpen(open); if (!open) { setTarget(null); activePathRef.current = null; } }}>
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
                Current {currentOverride ? (currentOverride.media_type === 'video_embed' ? 'video embed' : currentOverride.media_type === 'video_upload' ? 'uploaded video' : 'image (overridden)') : 'image'}
              </p>
              {currentOverride ? (
                <div className="flex flex-col items-center gap-2">
                  {currentOverride.media_type === 'image' ? (
                    <img src={`${currentOverride.media_url}?t=${Date.now()}`} alt="Current override" className="max-h-32 mx-auto rounded object-contain" />
                  ) : currentOverride.media_type === 'video_embed' && getEmbedPreviewUrl(currentOverride.media_url) ? (
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
                    <Undo2 className="h-3 w-3" /> Revert to Original
                  </Button>
                </div>
              ) : (
                <>
                  {activeElRef.current && 'src' in activeElRef.current ? (
                    <img src={(activeElRef.current as HTMLImageElement).src} alt="Current" className="max-h-32 mx-auto rounded object-contain" />
                  ) : null}
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
                          src={`${STORAGE_BASE}/${img.file_name}?t=${Date.now()}`}
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
                  ) : siteVideos.length === 0 && storageVideos.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-3">No videos found</p>
                  ) : (
                    <div className="space-y-3">
                      {siteVideos.length > 0 && (
                        <div>
                          <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide">From Database</p>
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
                        </div>
                      )}
                      {storageVideos.length > 0 && (
                        <div>
                          <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide">From Storage</p>
                          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                            {storageVideos.map(vid => (
                              <button
                                key={vid.name}
                                disabled={uploading}
                                onClick={async () => {
                                  if (!activePath) return;
                                  setUploading(true);
                                  try {
                                    await supabase.from('site_media_overrides').upsert({
                                      storage_path: activePath,
                                      media_type: 'video_upload',
                                      media_url: vid.url,
                                      thumbnail_url: '',
                                    }, { onConflict: 'storage_path' });
                                    await refreshOverrides();
                                    toast({ title: `Replaced with "${vid.name}". Refresh to see changes.` });
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
                                  <Video className="h-4 w-4 shrink-0 text-primary" />
                                  <div className="min-w-0">
                                    <span className="block text-xs font-medium truncate">{vid.name}</span>
                                    <span className="block text-[10px] text-muted-foreground truncate">Storage upload</span>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
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
