import { useState } from 'react';
import { Trash2, Plus, Pencil, Upload, X, Image as ImageIcon, Globe } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';
import { NEWS_CATEGORIES } from '@/data/resources';
import type { NewsItem, NewsCategory } from '@/data/resources';
import { toast } from '@/hooks/use-toast';
import { uploadToStorage } from '@/lib/storage';
import { validateImageFile } from '@/lib/validation';

const emptyNews = (): Omit<NewsItem, 'id'> => ({
  title: '', excerpt: '', content: '',
  date: new Date().toISOString().slice(0, 10),
  category: 'Company News', location: '', imageUrl: '',
  status: 'published', slug: '', metaTitle: '', metaDesc: '', sortOrder: 0,
});

const AdminNews = () => {
  const { data, addNews, updateNews, deleteNews } = useResourcesCMS();
  const [newNews, setNewNews] = useState<Omit<NewsItem, 'id'>>(emptyNews());
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleImageUpload = async (file: File, target: 'new' | 'edit') => {
    const error = validateImageFile(file);
    if (error) { toast({ title: error, variant: 'destructive' }); return; }
    try {
      const url = await uploadToStorage('media', 'news', file);
      if (target === 'new') setNewNews(c => ({ ...c, imageUrl: url }));
      else setEditingNews(c => c ? { ...c, imageUrl: url } : c);
    } catch {
      toast({ title: 'Failed to upload image', variant: 'destructive' });
    }
  };

  const handleAdd = async (status: 'published' | 'draft') => {
    if (!newNews.title.trim()) return;
    setSaving(true);
    await addNews({ ...newNews, title: newNews.title.trim(), excerpt: newNews.excerpt.trim(), status });
    setNewNews(emptyNews());
    setShowAddForm(false);
    setSaving(false);
    toast({ title: status === 'draft' ? 'Article saved as draft' : 'Article published' });
  };

  const handleSave = async () => {
    if (!editingNews) return;
    setSaving(true);
    await updateNews(editingNews);
    setEditingNews(null);
    setSaving(false);
    toast({ title: 'News article updated' });
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    await deleteNews(id);
    setSaving(false);
    toast({ title: 'News article removed' });
  };

  const ImageUploadArea = ({ imageUrl, onUpload, onClear }: { imageUrl: string; onUpload: (f: File) => void; onClear: () => void }) => (
    imageUrl ? (
      <div className="relative rounded-lg overflow-hidden border border-border aspect-[4/3]">
        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
        <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={onClear}><X className="h-3.5 w-3.5" /></Button>
      </div>
    ) : (
      <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border aspect-[4/3] cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-medium">Click to upload</span>
        <span className="text-xs text-muted-foreground">JPG, PNG, WebP</span>
        <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) onUpload(f); }} />
      </label>
    )
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">News</h1>
            <p className="text-muted-foreground text-sm mt-1">{data.news.length} article{data.news.length !== 1 ? 's' : ''} total</p>
          </div>
          {!showAddForm && (
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Article
            </Button>
          )}
        </div>

        {/* Add form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>New Article</CardTitle>
              <CardDescription>Fill in the details to publish a new news article.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-[1fr_260px] gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input value={newNews.title} onChange={e => setNewNews(c => ({ ...c, title: e.target.value }))} placeholder="e.g. AWALIFE at KSFM Conference 2025" />
                  </div>
                  <div className="space-y-2">
                    <Label>Excerpt <span className="text-muted-foreground text-xs">(shown on news cards)</span></Label>
                    <Textarea value={newNews.excerpt} onChange={e => setNewNews(c => ({ ...c, excerpt: e.target.value }))} rows={2} placeholder="Brief description..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Full Article Content</Label>
                    <RichTextEditor value={newNews.content} onChange={html => setNewNews(c => ({ ...c, content: html }))} />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={newNews.category} onValueChange={v => setNewNews(c => ({ ...c, category: v as NewsCategory }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{NEWS_CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" value={newNews.date} onChange={e => setNewNews(c => ({ ...c, date: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input value={newNews.location} onChange={e => setNewNews(c => ({ ...c, location: e.target.value }))} placeholder="e.g. Seoul, South Korea" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>URL Slug <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input value={newNews.slug} onChange={e => setNewNews(c => ({ ...c, slug: e.target.value }))} placeholder="e.g. ksfm-conference-2025" />
                  </div>
                  <details>
                    <summary className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors select-none">
                      <Globe className="h-3.5 w-3.5" /> SEO fields <span className="text-xs">(optional)</span>
                    </summary>
                    <div className="mt-3 space-y-3 pl-5 border-l border-border/40">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Meta Title</Label>
                        <Input value={newNews.metaTitle} onChange={e => setNewNews(c => ({ ...c, metaTitle: e.target.value }))} placeholder="Defaults to article title" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Meta Description</Label>
                        <Textarea value={newNews.metaDesc} onChange={e => setNewNews(c => ({ ...c, metaDesc: e.target.value }))} rows={2} placeholder="Defaults to excerpt" />
                      </div>
                    </div>
                  </details>
                  <div className="flex items-center justify-between pt-1">
                    <Button variant="destructive" onClick={() => { setNewNews(emptyNews()); setShowAddForm(false); }} disabled={saving}>
                      <X className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={() => handleAdd('draft')} disabled={saving || !newNews.title.trim()}>
                        Save as Draft
                      </Button>
                      <Button onClick={() => handleAdd('published')} disabled={saving || !newNews.title.trim()}>
                        <Plus className="mr-2 h-4 w-4" /> Publish
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <ImageUploadArea
                    imageUrl={newNews.imageUrl}
                    onUpload={f => void handleImageUpload(f, 'new')}
                    onClear={() => setNewNews(c => ({ ...c, imageUrl: '' }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Articles table */}
        <Card>
          <CardHeader>
            <CardTitle>All Articles</CardTitle>
          </CardHeader>
          <CardContent>
            {data.news.length ? (
              <div className="rounded-lg border border-border/40 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-14"></TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="w-24">Status</TableHead>
                      <TableHead className="w-36 whitespace-nowrap">Category</TableHead>
                      <TableHead className="w-28">Date</TableHead>
                      <TableHead className="w-32">Location</TableHead>
                      <TableHead className="w-20 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.news.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="p-2">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt="" className="h-10 w-14 rounded object-cover" />
                          ) : (
                            <div className="h-10 w-14 rounded bg-muted flex items-center justify-center"><ImageIcon className="h-4 w-4 text-muted-foreground" /></div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="max-w-xs truncate">{item.title}</div>
                          {item.excerpt && <div className="text-xs text-muted-foreground truncate max-w-xs mt-0.5">{item.excerpt}</div>}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${item.status === 'draft' ? 'bg-amber-500/10 text-amber-600' : 'bg-green-500/10 text-green-600'}`}>
                            {item.status === 'draft' ? 'Draft' : 'Published'}
                          </span>
                        </TableCell>
                        <TableCell><span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary/10 text-primary">{item.category}</span></TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.date ? new Date(item.date).toLocaleDateString() : '—'}</TableCell>
                        <TableCell className="text-sm text-muted-foreground truncate max-w-[120px]">{item.location || '—'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingNews({ ...item })}><Pencil className="h-3.5 w-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" disabled={saving} onClick={() => handleDelete(item.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No news articles yet. Click "Add Article" to create one.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingNews} onOpenChange={open => { if (!open) setEditingNews(null); }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Article</DialogTitle></DialogHeader>
          {editingNews && (
            <div className="space-y-5">
              <div className="grid md:grid-cols-[1fr_200px] gap-6">
                <div className="space-y-4">
                  <div className="space-y-2"><Label>Title</Label><Input value={editingNews.title} onChange={e => setEditingNews(c => c ? { ...c, title: e.target.value } : c)} /></div>
                  <div className="space-y-2"><Label>Excerpt</Label><Textarea value={editingNews.excerpt} onChange={e => setEditingNews(c => c ? { ...c, excerpt: e.target.value } : c)} rows={2} /></div>
                </div>
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <ImageUploadArea
                    imageUrl={editingNews.imageUrl}
                    onUpload={f => void handleImageUpload(f, 'edit')}
                    onClear={() => setEditingNews(c => c ? { ...c, imageUrl: '' } : c)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Full Article Content</Label>
                <RichTextEditor value={editingNews.content || ''} onChange={html => setEditingNews(c => c ? { ...c, content: html } : c)} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={editingNews.category} onValueChange={v => setEditingNews(c => c ? { ...c, category: v as NewsCategory } : c)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{NEWS_CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={editingNews.status ?? 'published'} onValueChange={v => setEditingNews(c => c ? { ...c, status: v as 'published' | 'draft' } : c)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Date</Label><Input type="date" value={editingNews.date} onChange={e => setEditingNews(c => c ? { ...c, date: e.target.value } : c)} /></div>
                <div className="space-y-2"><Label>Location</Label><Input value={editingNews.location} onChange={e => setEditingNews(c => c ? { ...c, location: e.target.value } : c)} /></div>
              </div>
              <div className="space-y-2">
                <Label>URL Slug <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input value={editingNews.slug ?? ''} onChange={e => setEditingNews(c => c ? { ...c, slug: e.target.value } : c)} placeholder="e.g. ksfm-conference-2025" />
              </div>
              <details>
                <summary className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors select-none">
                  <Globe className="h-3.5 w-3.5" /> SEO fields <span className="text-xs">(optional)</span>
                </summary>
                <div className="mt-3 space-y-3 pl-5 border-l border-border/40">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Meta Title</Label>
                    <Input value={editingNews.metaTitle ?? ''} onChange={e => setEditingNews(c => c ? { ...c, metaTitle: e.target.value } : c)} placeholder="Defaults to article title" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Meta Description</Label>
                    <Textarea value={editingNews.metaDesc ?? ''} onChange={e => setEditingNews(c => c ? { ...c, metaDesc: e.target.value } : c)} rows={2} placeholder="Defaults to excerpt" />
                  </div>
                </div>
              </details>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingNews(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminNews;
