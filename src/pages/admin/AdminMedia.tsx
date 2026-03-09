import { useState, useEffect, useCallback } from 'react';
import {
  Home, Package, FlaskConical, FolderOpen, Building2, Newspaper, Images,
  ChevronDown, ChevronRight, Plus, Trash2, Pencil, Upload, X, Play, Link as LinkIcon, Video,
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { dbSelect, dbInsert, dbUpdate, dbDelete } from '@/lib/db';
import { uploadToStorage, uploadAndReplace } from '@/lib/storage';
import { validateImageFile, validateVideoUrl, validateVideoFile } from '@/lib/validation';
import { supabase } from '@/integrations/supabase/client';
import CarouselImagesManager from '@/components/admin/CarouselImagesManager';

const STORAGE_MEDIA_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media`;

const getToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? '';
};

// Pages that have an application carousel
const CAROUSEL_PAGES = new Set(['blood', 'urine', 'feces', 'pleural', 'exotic']);

type NavLeaf = { type: 'leaf'; key: string; label: string; icon: React.ElementType };
type NavGroup = { type: 'group'; label: string; icon: React.ElementType; children: { key: string; label: string }[] };
type NavItem = NavLeaf | NavGroup;

const NAV: NavItem[] = [
  { type: 'leaf', key: 'home', label: 'Home', icon: Home },
  {
    type: 'group', label: 'Products', icon: Package,
    children: [
      { key: 'ai-analyzer', label: 'AI Analyzer' },
      { key: 'dm-03', label: 'DM-03 Microscope' },
    ],
  },
  {
    type: 'group', label: 'Applications', icon: FlaskConical,
    children: [
      { key: 'blood', label: 'Blood Analysis' },
      { key: 'urine', label: 'Urine Analysis' },
      { key: 'feces', label: 'Feces Analysis' },
      { key: 'pleural', label: 'Pleural Effusion' },
      { key: 'exotic', label: 'Exotic Animals' },
    ],
  },
  { type: 'leaf', key: 'resources', label: 'Resources', icon: FolderOpen },
  {
    type: 'group', label: 'Company', icon: Building2,
    children: [
      { key: 'about', label: 'About' },
      { key: 'contact', label: 'Contact' },
    ],
  },
  { type: 'leaf', key: 'news', label: 'News', icon: Newspaper },
  { type: 'leaf', key: 'general', label: 'General / Logos', icon: Images },
];

// ─── Images Panel ────────────────────────────────────────────────────────────

type SiteImage = { id: string; key: string; label: string; file_name: string; page_key: string };

const ImagesPanel = ({ pageKey }: { pageKey: string }) => {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cacheBuster, setCacheBuster] = useState<Record<string, number>>({});

  const [addOpen, setAddOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);

  const [editing, setEditing] = useState<SiteImage | null>(null);
  const [editLabel, setEditLabel] = useState('');

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await dbSelect<SiteImage>('site_images', `page_key=eq.${pageKey}&order=label.asc`);
      setImages(rows);
    } catch {
      toast({ title: 'Failed to load images', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [pageKey]);

  useEffect(() => { void fetch(); }, [fetch]);

  const getImageUrl = (fileName: string, key: string) => {
    const bust = cacheBuster[key];
    const path = fileName.includes('/') ? fileName : `assets/${fileName}`;
    return `${STORAGE_MEDIA_BASE}/${path}${bust ? `?t=${bust}` : ''}`;
  };

  const handleAdd = async () => {
    if (!newLabel.trim() || !newFile) return;
    const err = validateImageFile(newFile);
    if (err) { toast({ title: err, variant: 'destructive' }); return; }
    setSaving(true);
    try {
      const fileExt = newFile.name.split('.').pop() || 'png';
      const safeKey = newLabel.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
      const fileName = `${safeKey}.${fileExt}`;
      await uploadAndReplace('media', `assets/${fileName}`, newFile);
      const token = await getToken();
      await dbInsert('site_images', { key: safeKey, label: newLabel.trim(), category: 'Uncategorized', file_name: fileName, page_key: pageKey }, token);
      setAddOpen(false);
      setNewLabel('');
      setNewFile(null);
      await fetch();
      setCacheBuster(prev => ({ ...prev, [safeKey]: Date.now() }));
      toast({ title: 'Image added' });
    } catch {
      toast({ title: 'Failed to add image', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleRename = async () => {
    if (!editing || !editLabel.trim()) return;
    setSaving(true);
    try {
      const token = await getToken();
      await dbUpdate('site_images', editing.id, { label: editLabel.trim() }, token);
      setEditing(null);
      await fetch();
      toast({ title: 'Image renamed' });
    } catch {
      toast({ title: 'Failed to rename', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (img: SiteImage) => {
    setSaving(true);
    try {
      const token = await getToken();
      await dbDelete('site_images', img.id, token);
      await fetch();
      toast({ title: `${img.label} removed` });
    } catch {
      toast({ title: 'Failed to delete', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Images</CardTitle>
            <CardDescription>Images for this page. Use the camera icon on the live site to replace.</CardDescription>
          </div>
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Upload Image
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8 text-sm">Loading...</p>
          ) : images.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">No images for this page yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {images.map(img => (
                <div key={img.id} className="space-y-2">
                  <div className="relative aspect-[4/3] rounded-lg border border-border overflow-hidden bg-muted">
                    <img
                      src={getImageUrl(img.file_name, img.key)}
                      alt={img.label}
                      className="w-full h-full object-contain"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium truncate flex-1">{img.label}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => { setEditing(img); setEditLabel(img.label); }}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-destructive hover:text-destructive" disabled={saving} onClick={() => handleDelete(img)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Upload Image</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Label *</Label>
              <Input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="e.g. Hero Banner" />
            </div>
            <div className="space-y-2">
              <Label>Image File *</Label>
              {newFile ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground truncate flex-1">{newFile.name}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setNewFile(null)}><X className="h-3.5 w-3.5" /></Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-6 cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to select image</span>
                  <span className="text-xs text-muted-foreground">JPG, PNG, WebP, GIF (max 5MB)</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setNewFile(f); }} />
                </label>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setAddOpen(false); setNewLabel(''); setNewFile(null); }}>Cancel</Button>
            <Button onClick={handleAdd} disabled={saving || !newLabel.trim() || !newFile}>{saving ? 'Uploading...' : 'Upload'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editing} onOpenChange={open => { if (!open) setEditing(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Rename Image</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-lg border border-border overflow-hidden bg-muted">
                <img src={getImageUrl(editing.file_name, editing.key)} alt={editing.label} className="w-full h-full object-contain" />
              </div>
              <div className="space-y-2">
                <Label>Label</Label>
                <Input value={editLabel} onChange={e => setEditLabel(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') void handleRename(); }} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleRename} disabled={saving || !editLabel.trim()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// ─── Videos Panel ─────────────────────────────────────────────────────────────

type SiteVideo = { id: string; key: string; label: string; video_type: 'embed' | 'upload'; video_url: string; file_name: string; thumbnail_url: string; page_key: string };

const getEmbedUrl = (url: string): string | null => {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
};

const VideosPanel = ({ pageKey }: { pageKey: string }) => {
  const [videos, setVideos] = useState<SiteVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newVideoType, setNewVideoType] = useState<'embed' | 'upload'>('embed');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);

  const [editing, setEditing] = useState<SiteVideo | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editVideoUrl, setEditVideoUrl] = useState('');

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await dbSelect<SiteVideo>('site_videos', `page_key=eq.${pageKey}&order=label.asc`);
      setVideos(rows);
    } catch {
      toast({ title: 'Failed to load videos', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [pageKey]);

  useEffect(() => { void fetch(); }, [fetch]);

  const handleAdd = async () => {
    if (!newLabel.trim()) return;
    if (newVideoType === 'embed') {
      const err = validateVideoUrl(newVideoUrl);
      if (err) { toast({ title: err, variant: 'destructive' }); return; }
    } else if (!newFile) {
      toast({ title: 'Please select a video file', variant: 'destructive' }); return;
    }
    setSaving(true);
    try {
      const safeKey = newLabel.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
      let videoUrl = '';
      let fileName = '';
      if (newVideoType === 'upload' && newFile) {
        const vErr = validateVideoFile(newFile);
        if (vErr) { toast({ title: vErr, variant: 'destructive' }); setSaving(false); return; }
        videoUrl = await uploadToStorage('media', 'videos', newFile);
        fileName = newFile.name;
      } else {
        videoUrl = newVideoUrl.trim();
      }
      let thumbnailUrl = '';
      if (newVideoType === 'embed') {
        const ytMatch = videoUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (ytMatch) thumbnailUrl = `https://img.youtube.com/vi/${ytMatch[1]}/mqdefault.jpg`;
      }
      const token = await getToken();
      await dbInsert('site_videos', { key: safeKey, label: newLabel.trim(), category: 'Uncategorized', video_type: newVideoType, video_url: videoUrl, file_name: fileName, thumbnail_url: thumbnailUrl, page_key: pageKey }, token);
      setAddOpen(false);
      setNewLabel(''); setNewVideoType('embed'); setNewVideoUrl(''); setNewFile(null);
      await fetch();
      toast({ title: 'Video added' });
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
      await fetch();
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
      await fetch();
      toast({ title: `${video.label} removed` });
    } catch {
      toast({ title: 'Failed to delete video', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Videos</CardTitle>
            <CardDescription>Embed links and uploaded videos for this page.</CardDescription>
          </div>
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Video
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8 text-sm">Loading...</p>
          ) : videos.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">No videos for this page yet.</p>
          ) : (
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
                      {video.video_type === 'embed' ? <><LinkIcon className="h-2.5 w-2.5" /> Embed</> : <><Upload className="h-2.5 w-2.5" /> Upload</>}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium truncate flex-1">{video.label}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => { setEditing(video); setEditLabel(video.label); setEditVideoUrl(video.video_url); }}>
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
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add Video</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Label *</Label>
              <Input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="e.g. Product Demo" />
            </div>
            <div className="space-y-2">
              <Label>Source</Label>
              <div className="flex gap-2">
                <Button size="sm" variant={newVideoType === 'embed' ? 'default' : 'outline'} onClick={() => { setNewVideoType('embed'); setNewFile(null); setNewVideoUrl(''); }}>
                  <LinkIcon className="h-3.5 w-3.5 mr-1" /> Embed URL
                </Button>
                <Button size="sm" variant={newVideoType === 'upload' ? 'default' : 'outline'} onClick={() => { setNewVideoType('upload'); setNewVideoUrl(''); }}>
                  <Upload className="h-3.5 w-3.5 mr-1" /> Upload File
                </Button>
              </div>
              {newVideoType === 'embed' ? (
                <div className="space-y-2">
                  <Input value={newVideoUrl} onChange={e => setNewVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                  <p className="text-xs text-muted-foreground">Supports YouTube, Vimeo, or direct video links</p>
                  {newVideoUrl && getEmbedUrl(newVideoUrl) && (
                    <div className="aspect-video rounded-lg overflow-hidden border border-border">
                      <iframe src={getEmbedUrl(newVideoUrl)!} className="w-full h-full" allowFullScreen title="Preview" />
                    </div>
                  )}
                </div>
              ) : (
                newFile ? (
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
                )
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={saving || !newLabel.trim() || (newVideoType === 'embed' ? !newVideoUrl.trim() : !newFile)}>
              {saving ? 'Saving...' : 'Add Video'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editing} onOpenChange={open => { if (!open) setEditing(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Edit Video</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              {editing.video_type === 'embed' && getEmbedUrl(editVideoUrl) && (
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

// ─── Main Component ───────────────────────────────────────────────────────────

const AdminMedia = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(['Products', 'Applications', 'Company']));

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
  };

  const selectedLabel = (() => {
    for (const item of NAV) {
      if (item.type === 'leaf' && item.key === selectedPage) return item.label;
      if (item.type === 'group') {
        const child = item.children.find(c => c.key === selectedPage);
        if (child) return child.label;
      }
    }
    return selectedPage;
  })();

  const showCarousel = CAROUSEL_PAGES.has(selectedPage);

  return (
    <AdminLayout noPadding>
      <div className="flex h-full overflow-hidden">
        {/* Left nav */}
        <aside className="w-52 shrink-0 border-r border-border bg-muted/20 overflow-y-auto py-4 px-2 space-y-0.5">
          <p className="px-2 pb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Pages</p>
          {NAV.map(item => {
            if (item.type === 'leaf') {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setSelectedPage(item.key)}
                  className={`w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium transition-colors text-left ${
                    selectedPage === item.key
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </button>
              );
            }
            const Icon = item.icon;
            const isOpen = openGroups.has(item.label);
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleGroup(item.label)}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium text-foreground/60 hover:bg-accent hover:text-foreground transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </button>
                {isOpen && (
                  <div className="ml-4 pl-2 border-l border-border/50 mt-0.5 space-y-0.5">
                    {item.children.map(child => (
                      <button
                        key={child.key}
                        onClick={() => setSelectedPage(child.key)}
                        className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                          selectedPage === child.key
                            ? 'bg-primary text-primary-foreground font-medium'
                            : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </aside>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">{selectedLabel}</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage images, videos, and carousel for this page.</p>
          </div>

          <Tabs defaultValue="images" key={selectedPage}>
            <TabsList>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              {showCarousel && <TabsTrigger value="carousel">Carousel</TabsTrigger>}
            </TabsList>

            <TabsContent value="images" className="mt-6">
              <ImagesPanel pageKey={selectedPage} />
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <VideosPanel pageKey={selectedPage} />
            </TabsContent>

            {showCarousel && (
              <TabsContent value="carousel" className="mt-6">
                <CarouselImagesManager />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;
