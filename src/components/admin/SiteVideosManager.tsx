import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Plus, Pencil, Upload, X, Video, Link, Play, HardDrive } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { uploadToStorage } from '@/lib/storage';
import { validateVideoFile, validateVideoUrl } from '@/lib/validation';
import { dbSelect, dbInsert, dbUpdate, dbDelete } from '@/lib/db';
import { supabase } from '@/integrations/supabase/client';

type SiteVideo = {
  id: string;
  key: string;
  label: string;
  category: string;
  video_type: 'embed' | 'upload';
  video_url: string;
  file_name: string;
  thumbnail_url: string;
};

const getToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? '';
};

const getEmbedUrl = (url: string): string | null => {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
};

type StorageVideo = { name: string; url: string; folder: string };

const SiteVideosManager = () => {
  const [videos, setVideos] = useState<SiteVideo[]>([]);
  const [storageVideos, setStorageVideos] = useState<StorageVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Add dialog
  const [addOpen, setAddOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newVideoType, setNewVideoType] = useState<'embed' | 'upload'>('embed');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newThumbnailUrl, setNewThumbnailUrl] = useState('');

  // Edit dialog
  const [editing, setEditing] = useState<SiteVideo | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editVideoUrl, setEditVideoUrl] = useState('');

  const fetchVideos = useCallback(async () => {
    try {
      const rows = await dbSelect<SiteVideo>('site_videos', 'order=label.asc');
      setVideos(rows);
      // Also scan storage for unmanaged video files
      const videoExtensions = ['mp4', 'webm', 'ogg', 'mov'];
      const folders = ['videos', 'assets'];
      const allVids: StorageVideo[] = [];
      for (const folder of folders) {
        const { data: storageFiles } = await supabase.storage.from('media').list(folder);
        if (storageFiles) {
          storageFiles
            .filter(f => videoExtensions.some(ext => f.name.toLowerCase().endsWith(`.${ext}`)))
            .forEach(f => {
              // Skip if already managed in DB
              const url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media/${folder}/${f.name}`;
              if (!rows.some(r => r.video_url === url)) {
                allVids.push({ name: f.name, url, folder });
              }
            });
        }
      }
      setStorageVideos(allVids);
    } catch (err) {
      console.error('[SiteVideos] fetch error', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  const handleAddVideo = async () => {
    if (!newLabel.trim()) return;

    if (newVideoType === 'embed') {
      const error = validateVideoUrl(newVideoUrl);
      if (error) { toast({ title: error, variant: 'destructive' }); return; }
    } else if (!newFile) {
      toast({ title: 'Please select a video file', variant: 'destructive' }); return;
    }

    setSaving(true);
    try {
      const safeKey = newLabel.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
      let videoUrl = '';
      let fileName = '';

      if (newVideoType === 'upload' && newFile) {
        const vError = validateVideoFile(newFile);
        if (vError) { toast({ title: vError, variant: 'destructive' }); setSaving(false); return; }
        videoUrl = await uploadToStorage('media', 'videos', newFile);
        fileName = newFile.name;
      } else {
        videoUrl = newVideoUrl.trim();
      }

      // Auto-generate YouTube thumbnail
      let thumbnailUrl = newThumbnailUrl.trim();
      if (!thumbnailUrl && newVideoType === 'embed') {
        const ytMatch = videoUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (ytMatch) thumbnailUrl = `https://img.youtube.com/vi/${ytMatch[1]}/mqdefault.jpg`;
      }

      const token = await getToken();
      await dbInsert('site_videos', {
        key: safeKey,
        label: newLabel.trim(),
        category: 'Uncategorized',
        video_type: newVideoType,
        video_url: videoUrl,
        file_name: fileName,
        thumbnail_url: thumbnailUrl,
      }, token);

      setAddOpen(false);
      setNewLabel('');
      setNewVideoType('embed');
      setNewVideoUrl('');
      setNewFile(null);
      setNewThumbnailUrl('');
      await fetchVideos();
      toast({ title: 'Video added successfully' });
    } catch {
      toast({ title: 'Failed to add video', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editing || !editLabel.trim()) return;
    setSaving(true);
    try {
      const token = await getToken();
      const updates: Record<string, string> = { label: editLabel.trim() };
      if (editing.video_type === 'embed' && editVideoUrl !== editing.video_url) {
        updates.video_url = editVideoUrl.trim();
        const ytMatch = editVideoUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (ytMatch) updates.thumbnail_url = `https://img.youtube.com/vi/${ytMatch[1]}/mqdefault.jpg`;
      }
      await dbUpdate('site_videos', editing.id, updates, token);
      setEditing(null);
      await fetchVideos();
      toast({ title: 'Video updated' });
    } catch {
      toast({ title: 'Failed to update video', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (video: SiteVideo) => {
    setSaving(true);
    try {
      const token = await getToken();
      await dbDelete('site_videos', video.id, token);
      await fetchVideos();
      toast({ title: `${video.label} removed` });
    } catch {
      toast({ title: 'Failed to delete video', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (video: SiteVideo) => {
    setEditing(video);
    setEditLabel(video.label);
    setEditVideoUrl(video.video_url);
  };

  if (loading) return <p className="text-center text-muted-foreground py-8">Loading videos...</p>;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Site Videos</CardTitle>
            <CardDescription>All video embeds and uploaded videos for the website.</CardDescription>
          </div>
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Video
          </Button>
        </CardHeader>
        <CardContent>
          {videos.length === 0 && storageVideos.length === 0 ? (
            <p className="text-muted-foreground text-center py-4 text-sm">No videos found. Click "Add Video" to get started.</p>
          ) : (
            <div className="space-y-6">
              {/* Managed videos */}
              {videos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map(video => (
                    <div key={video.id} className="space-y-2">
                      <div className="relative aspect-video rounded-lg border border-border overflow-hidden bg-muted">
                        {video.video_type === 'embed' ? (
                          video.thumbnail_url ? (
                            <div className="relative w-full h-full">
                              <img src={video.thumbnail_url} alt={video.label} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-background/80 rounded-full p-2">
                                  <Play className="h-6 w-6 text-foreground" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Video className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )
                        ) : (
                          <video src={video.video_url} className="w-full h-full object-cover" muted preload="metadata" />
                        )}
                        <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-background/80 text-foreground">
                          {video.video_type === 'embed' ? <><Link className="h-2.5 w-2.5" /> Embed</> : <><Upload className="h-2.5 w-2.5" /> Upload</>}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-foreground truncate flex-1">{video.label}</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => openEdit(video)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-destructive hover:text-destructive" disabled={saving} onClick={() => handleDelete(video)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Unmanaged storage videos */}
              {storageVideos.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <HardDrive className="h-3.5 w-3.5" /> Untracked storage files
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {storageVideos.map(vid => (
                      <div key={vid.url} className="space-y-2">
                        <div className="relative aspect-video rounded-lg border border-dashed border-border overflow-hidden bg-muted">
                          <video src={vid.url} className="w-full h-full object-cover" muted preload="metadata" />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium text-foreground truncate flex-1">{vid.name}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 shrink-0"
                            disabled={saving}
                            onClick={async () => {
                              setSaving(true);
                              try {
                                const safeKey = vid.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                const label = vid.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                                const token = await getToken();
                                await dbInsert('site_videos', {
                                  key: safeKey, label, category: 'Uncategorized',
                                  video_type: 'upload', video_url: vid.url, file_name: vid.name, thumbnail_url: '',
                                }, token);
                                await fetchVideos();
                                toast({ title: `"${label}" added to library` });
                              } catch {
                                toast({ title: 'Failed to add video', variant: 'destructive' });
                              } finally {
                                setSaving(false);
                              }
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add to Library
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Video Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add New Video</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Label *</Label>
              <Input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="e.g. Product Demo Video" />
            </div>
            <div className="space-y-2">
              <Label>Video Source</Label>
              <Tabs value={newVideoType} onValueChange={v => { setNewVideoType(v as 'embed' | 'upload'); setNewFile(null); setNewVideoUrl(''); }}>
                <TabsList className="w-full">
                  <TabsTrigger value="embed" className="flex-1 gap-1"><Link className="h-3 w-3" /> Embed URL</TabsTrigger>
                  <TabsTrigger value="upload" className="flex-1 gap-1"><Upload className="h-3 w-3" /> Upload File</TabsTrigger>
                </TabsList>
                <TabsContent value="embed" className="mt-3 space-y-3">
                  <div className="space-y-2">
                    <Label>Video URL *</Label>
                    <Input value={newVideoUrl} onChange={e => setNewVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                    <p className="text-xs text-muted-foreground">Supports YouTube, Vimeo, or direct video links</p>
                  </div>
                  {newVideoUrl && getEmbedUrl(newVideoUrl) && (
                    <div className="aspect-video rounded-lg overflow-hidden border border-border">
                      <iframe src={getEmbedUrl(newVideoUrl)!} className="w-full h-full" allowFullScreen title="Preview" />
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="upload" className="mt-3">
                  {newFile ? (
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-sm text-muted-foreground truncate flex-1">{newFile.name}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setNewFile(null)}><X className="h-3.5 w-3.5" /></Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-6 cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Click to select video</span>
                      <span className="text-xs text-muted-foreground">MP4, WebM, OGG (max 20MB)</span>
                      <input type="file" accept="video/mp4,video/webm,video/ogg" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setNewFile(f); }} />
                    </label>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-2">
              <Label>Thumbnail URL (optional)</Label>
              <Input value={newThumbnailUrl} onChange={e => setNewThumbnailUrl(e.target.value)} placeholder="Auto-generated for YouTube" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAddVideo} disabled={saving || !newLabel.trim() || (newVideoType === 'embed' ? !newVideoUrl.trim() : !newFile)}>
              {saving ? 'Saving...' : 'Add Video'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Video Dialog */}
      <Dialog open={!!editing} onOpenChange={open => { if (!open) setEditing(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Edit Video</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              {editing.video_type === 'embed' && editing.video_url && getEmbedUrl(editVideoUrl) && (
                <div className="aspect-video rounded-lg overflow-hidden border border-border">
                  <iframe src={getEmbedUrl(editVideoUrl)!} className="w-full h-full" allowFullScreen title="Preview" />
                </div>
              )}
              <div className="space-y-2">
                <Label>Label</Label>
                <Input value={editLabel} onChange={e => setEditLabel(e.target.value)} />
              </div>
              {editing.video_type === 'embed' && (
                <div className="space-y-2">
                  <Label>Video URL</Label>
                  <Input value={editVideoUrl} onChange={e => setEditVideoUrl(e.target.value)} />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit} disabled={saving || !editLabel.trim()}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SiteVideosManager;
