import { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Trash2, Upload, X, GripVertical, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { dbSelect, dbInsert, dbUpdate, dbDelete } from '@/lib/db';
import { uploadToStorage } from '@/lib/storage';
import { validateImageFile } from '@/lib/validation';
import { supabase } from '@/integrations/supabase/client';

const PAGE_OPTIONS = [
  { key: 'blood', label: 'Blood Analysis' },
  { key: 'feces', label: 'Feces Analysis' },
  { key: 'urine', label: 'Urine Analysis' },
  { key: 'pleural-effusion', label: 'Pleural Effusion' },
  { key: 'body-fluids', label: 'Body Fluids' },
  { key: 'exotic-animals', label: 'Exotic Animals' },
];

type CarouselImage = {
  id: string;
  page_key: string;
  image_url: string;
  label: string;
  sort_order: number;
};

const getToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? '';
};

const CarouselImagesManager = () => {
  const [selectedPage, setSelectedPage] = useState(PAGE_OPTIONS[0].key);
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newLabels, setNewLabels] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await dbSelect<CarouselImage>(
        'application_carousel_images',
        `page_key=eq.${selectedPage}&order=sort_order.asc`
      );
      setImages(rows);
    } catch (err) {
      console.error('[CarouselManager] fetch error', err);
    } finally {
      setLoading(false);
    }
  }, [selectedPage]);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const fileNameToLabel = (name: string) => {
    return name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  const handleFilesSelected = (files: FileList) => {
    const arr = Array.from(files);
    setNewFiles(prev => [...prev, ...arr]);
    setNewLabels(prev => [...prev, ...arr.map(f => fileNameToLabel(f.name))]);
  };

  const removeNewFile = (idx: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== idx));
    setNewLabels(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddImages = async () => {
    if (newFiles.length === 0) return;
    for (const f of newFiles) {
      const error = validateImageFile(f);
      if (error) { toast({ title: `${f.name}: ${error}`, variant: 'destructive' }); return; }
    }

    setUploading(true);
    try {
      const token = await getToken();
      let nextOrder = images.length > 0 ? Math.max(...images.map(i => i.sort_order)) + 1 : 0;

      for (let i = 0; i < newFiles.length; i++) {
        const url = await uploadToStorage('media', 'carousel', newFiles[i]);
        await dbInsert('application_carousel_images', {
          page_key: selectedPage,
          image_url: url,
          label: newLabels[i]?.trim() || '',
          sort_order: nextOrder++,
        }, token);
      }

      setAddOpen(false);
      setNewFiles([]);
      setNewLabels([]);
      await fetchImages();
      toast({ title: `${newFiles.length} image(s) added to carousel` });
    } catch {
      toast({ title: 'Failed to add images', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (img: CarouselImage) => {
    setSaving(true);
    try {
      const token = await getToken();
      await dbDelete('application_carousel_images', img.id, token);
      await fetchImages();
      toast({ title: 'Image removed' });
    } catch {
      toast({ title: 'Failed to delete image', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateLabel = async (img: CarouselImage, newLbl: string) => {
    try {
      const token = await getToken();
      await dbUpdate('application_carousel_images', img.id, { label: newLbl }, token);
      setImages(prev => prev.map(i => i.id === img.id ? { ...i, label: newLbl } : i));
    } catch {
      toast({ title: 'Failed to update label', variant: 'destructive' });
    }
  };

  const pageLabel = PAGE_OPTIONS.find(p => p.key === selectedPage)?.label || selectedPage;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle>Application Carousel Images</CardTitle>
            <CardDescription>Manage the "True-to-life Images" carousel for each application page.</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_OPTIONS.map(p => (
                  <SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Image
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Loading...</p>
          ) : images.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No carousel images for {pageLabel} yet.</p>
              <p className="text-sm mt-1">Click "Add Image" to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div key={img.id} className="space-y-2">
                  <div className="relative aspect-square rounded-lg border border-border overflow-hidden bg-muted">
                    <img
                      src={img.image_url}
                      alt={img.label || `Image ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                    />
                    <div className="absolute top-1 left-1 bg-background/80 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      #{idx + 1}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      value={img.label}
                      onChange={e => {
                        const val = e.target.value;
                        setImages(prev => prev.map(i => i.id === img.id ? { ...i, label: val } : i));
                      }}
                      onBlur={e => handleUpdateLabel(img, e.target.value)}
                      placeholder="Image label"
                      className="h-7 text-xs"
                    />
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

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={o => { if (!o) { setNewFiles([]); setNewLabels([]); } setAddOpen(o); }}>
        <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Add Carousel Images — {pageLabel}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto flex-1">
            <div className="space-y-2">
              <Label>Image Files *</Label>
              <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-6 cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors">
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click to select images (multiple)</span>
                <span className="text-xs text-muted-foreground">JPG, PNG, WebP (max 5MB each)</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={e => { if (e.target.files) handleFilesSelected(e.target.files); e.target.value = ''; }} />
              </label>
            </div>

            {newFiles.length > 0 && (
              <div className="space-y-3">
                <Label>{newFiles.length} file(s) selected</Label>
                {newFiles.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-border bg-secondary/20">
                    <img
                      src={URL.createObjectURL(f)}
                      alt={f.name}
                      className="w-10 h-10 rounded object-cover shrink-0"
                    />
                    <Input
                      value={newLabels[idx] || ''}
                      onChange={e => setNewLabels(prev => prev.map((l, i) => i === idx ? e.target.value : l))}
                      placeholder="Label"
                      className="h-8 text-xs flex-1"
                    />
                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => removeNewFile(idx)}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAddImages} disabled={uploading || newFiles.length === 0}>
              {uploading ? 'Uploading...' : `Add ${newFiles.length} Image${newFiles.length !== 1 ? 's' : ''}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CarouselImagesManager;
