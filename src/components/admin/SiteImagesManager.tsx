import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Trash2, Plus, Pencil, Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { uploadAndReplace } from '@/lib/storage';
import { validateImageFile } from '@/lib/validation';
import { dbSelect, dbInsert, dbUpdate, dbDelete } from '@/lib/db';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_MEDIA_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media`;

type SiteImage = {
  id: string;
  key: string;
  label: string;
  category: string;
  file_name: string;
};

const getToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? '';
};

const SiteImagesManager = () => {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [cacheBuster, setCacheBuster] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);

  const [editing, setEditing] = useState<SiteImage | null>(null);
  const [editLabel, setEditLabel] = useState('');

  const fetchImages = useCallback(async () => {
    try {
      const rows = await dbSelect<SiteImage>('site_images', 'order=label.asc');
      setImages(rows);
    } catch (err) {
      console.error('[SiteImages] fetch error', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const getImageUrl = (fileName: string, key: string) => {
    const bust = cacheBuster[key];
    const path = fileName.includes('/') ? fileName : `assets/${fileName}`;
    return `${STORAGE_MEDIA_BASE}/${path}${bust ? `?t=${bust}` : ''}`;
  };

  const handleAddImage = async () => {
    if (!newLabel.trim() || !newFile) return;
    const error = validateImageFile(newFile);
    if (error) { toast({ title: error, variant: 'destructive' }); return; }
    setSaving(true);
    try {
      const fileExt = newFile.name.split('.').pop() || 'png';
      const safeKey = newLabel.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
      const fileName = `${safeKey}.${fileExt}`;
      await uploadAndReplace('media', `assets/${fileName}`, newFile);
      const token = await getToken();
      await dbInsert('site_images', { key: safeKey, label: newLabel.trim(), category: 'Uncategorized', file_name: fileName }, token);
      setAddOpen(false);
      setNewLabel('');
      setNewFile(null);
      await fetchImages();
      setCacheBuster(prev => ({ ...prev, [safeKey]: Date.now() }));
      toast({ title: 'Image added successfully' });
    } catch {
      toast({ title: 'Failed to add image', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editing || !editLabel.trim()) return;
    setSaving(true);
    try {
      const token = await getToken();
      await dbUpdate('site_images', editing.id, { label: editLabel.trim() }, token);
      setEditing(null);
      await fetchImages();
      toast({ title: 'Image renamed' });
    } catch {
      toast({ title: 'Failed to rename image', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (img: SiteImage) => {
    setSaving(true);
    try {
      const token = await getToken();
      await dbDelete('site_images', img.id, token);
      await fetchImages();
      toast({ title: `${img.label} removed` });
    } catch {
      toast({ title: 'Failed to delete image', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center text-muted-foreground py-8">Loading images...</p>;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Site Images</CardTitle>
            <CardDescription>All uploaded images. Use the camera icon on the live site to replace an image. Upload new images here.</CardDescription>
          </div>
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Upload Image
          </Button>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">No images yet. Click "Upload Image" to add one.</p>
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
                    <span className="text-xs font-medium text-foreground truncate flex-1">{img.label}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                      onClick={() => { setEditing(img); setEditLabel(img.label); }}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0 text-destructive hover:text-destructive"
                      disabled={saving}
                      onClick={() => handleDelete(img)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Image Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Upload New Image</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Label *</Label>
              <Input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="e.g. Clinic Banner" />
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
            <Button onClick={handleAddImage} disabled={saving || !newLabel.trim() || !newFile}>
              {saving ? 'Uploading...' : 'Upload'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Dialog */}
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
                <Input value={editLabel} onChange={e => setEditLabel(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') void handleSaveEdit(); }} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit} disabled={saving || !editLabel.trim()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SiteImagesManager;
