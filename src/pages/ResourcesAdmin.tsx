import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, RotateCcw, Pencil, FileText, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';
import {
  RESOURCE_KIND_CONFIG,
  RESOURCE_PRODUCT_OPTIONS,
  NEWS_CATEGORIES,
} from '@/data/resources';
import type {
  ResourceItem,
  ResourceKind,
  ResourceMediaType,
  ResourceProductId,
  NewsItem,
  NewsCategory,
} from '@/data/resources';
import { toast } from '@/hooks/use-toast';

const createId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

type ResourceFormState = {
  title: string;
  summary: string;
  kind: ResourceKind;
  productId: ResourceProductId;
  mediaType: ResourceMediaType;
  mediaUrl: string;
  mediaName: string;
  mediaMime: string;
};

const defaultKind = (RESOURCE_KIND_CONFIG[0]?.id || 'how-to') as ResourceKind;
const defaultProduct = (RESOURCE_PRODUCT_OPTIONS[0]?.id || 'all') as ResourceProductId;

const kindLabelMap = RESOURCE_KIND_CONFIG.reduce<Record<string, string>>((a, k) => { a[k.id] = k.label; return a; }, {});
const productLabelMap = RESOURCE_PRODUCT_OPTIONS.reduce<Record<string, string>>((a, p) => { a[p.id] = p.label; return a; }, {});

const ResourcesAdmin = () => {
  const { data, setData, resetData } = useResourcesCMS();

  // Resource form
  const [newResource, setNewResource] = useState<ResourceFormState>({
    title: '', summary: '', kind: defaultKind, productId: defaultProduct,
    mediaType: 'upload', mediaUrl: '', mediaName: '', mediaMime: '',
  });

  // News form
  const [newNews, setNewNews] = useState<Omit<NewsItem, 'id'>>({
    title: '', excerpt: '', date: new Date().toISOString().slice(0, 10), category: 'Exhibition', location: '', imageUrl: '',
  });

  // Edit dialogs
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [editingFaq, setEditingFaq] = useState<{ id: string; question: string; answer: string } | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // ---- Resource helpers ----
  const handleNewResourceFile = async (file: File) => {
    const dataUrl = await readFileAsDataUrl(file);
    setNewResource(c => ({ ...c, mediaType: 'upload', mediaUrl: dataUrl, mediaName: file.name, mediaMime: file.type }));
  };

  const removeResource = (id: string) => {
    setData(c => ({ ...c, resources: c.resources.filter(r => r.id !== id) }));
    toast({ title: 'Resource removed' });
  };

  const addResource = () => {
    if (!newResource.title.trim() || !newResource.mediaUrl.trim()) return;
    const item: ResourceItem = {
      id: createId('resource'), title: newResource.title.trim(), summary: newResource.summary.trim(),
      kind: newResource.kind, productId: newResource.productId, mediaType: newResource.mediaType,
      mediaUrl: newResource.mediaUrl.trim(), mediaName: newResource.mediaName.trim(), mediaMime: newResource.mediaMime.trim(),
    };
    setData(c => ({ ...c, resources: [...c.resources, item] }));
    setNewResource(c => ({ ...c, title: '', summary: '', mediaUrl: '', mediaName: '', mediaMime: '' }));
    toast({ title: 'Resource added' });
  };

  const saveEditingResource = () => {
    if (!editingResource) return;
    setData(c => ({ ...c, resources: c.resources.map(r => r.id === editingResource.id ? editingResource : r) }));
    setEditingResource(null);
    toast({ title: 'Resource updated' });
  };

  // ---- News image upload helpers ----
  const handleNewsImageUpload = async (file: File, target: 'new' | 'edit') => {
    const dataUrl = await readFileAsDataUrl(file);
    if (target === 'new') {
      setNewNews(c => ({ ...c, imageUrl: dataUrl }));
    } else {
      setEditingNews(c => c ? { ...c, imageUrl: dataUrl } : c);
    }
  };

  // ---- News helpers ----
  const addNewsItem = () => {
    if (!newNews.title.trim()) return;
    const item: NewsItem = { id: createId('news'), ...newNews, title: newNews.title.trim(), excerpt: newNews.excerpt.trim() };
    setData(c => ({ ...c, news: [item, ...c.news] }));
    setNewNews({ title: '', excerpt: '', date: new Date().toISOString().slice(0, 10), category: 'Exhibition', location: '', imageUrl: '' });
    toast({ title: 'News item added' });
  };

  const removeNewsItem = (id: string) => {
    setData(c => ({ ...c, news: c.news.filter(n => n.id !== id) }));
    toast({ title: 'News item removed' });
  };

  const saveEditingNews = () => {
    if (!editingNews) return;
    setData(c => ({ ...c, news: c.news.map(n => n.id === editingNews.id ? editingNews : n) }));
    setEditingNews(null);
    toast({ title: 'News item updated' });
  };

  // ---- FAQ helpers ----
  const addFaqItem = () => {
    setData(c => ({ ...c, faq: { ...c.faq, items: [...c.faq.items, { id: createId('faq'), question: 'New question', answer: 'New answer' }] } }));
    toast({ title: 'FAQ item added' });
  };

  const removeFaqItem = (id: string) => {
    setData(c => ({ ...c, faq: { ...c.faq, items: c.faq.items.filter(i => i.id !== id) } }));
    toast({ title: 'FAQ item removed' });
  };

  const saveEditingFaq = () => {
    if (!editingFaq) return;
    setData(c => ({ ...c, faq: { ...c.faq, items: c.faq.items.map(i => i.id === editingFaq.id ? editingFaq : i) } }));
    setEditingFaq(null);
    toast({ title: 'FAQ item updated' });
  };

  const selectedKindConfig = RESOURCE_KIND_CONFIG.find(k => k.id === newResource.kind) || RESOURCE_KIND_CONFIG[0];
  const isAddResourceDisabled = !newResource.title.trim() || !newResource.mediaUrl.trim() || (newResource.mediaType === 'upload' && !newResource.mediaName.trim());

  return (
    <Layout>
      <section className="pt-32 pb-8 lg:pt-36">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-2">Admin</span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Content Management</h1>
              <p className="text-muted-foreground mt-2">Manage Resources and News page content. Changes save automatically to browser storage.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => { resetData(); toast({ title: 'Reset to defaults' }); }} className="shrink-0">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset All
            </Button>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="mb-8 w-full justify-start">
              <TabsTrigger value="news">News ({data.news.length})</TabsTrigger>
              <TabsTrigger value="resources">Resources ({data.resources.length})</TabsTrigger>
              <TabsTrigger value="faq">FAQ ({data.faq.items.length})</TabsTrigger>
            </TabsList>

            {/* ===== NEWS TAB ===== */}
            <TabsContent value="news" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add News Item</CardTitle>
                  <CardDescription>Create a new news entry with image, details, and category.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-[1fr_280px] gap-6">
                    {/* Left: form fields */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Title *</Label>
                        <Input value={newNews.title} onChange={e => setNewNews(c => ({ ...c, title: e.target.value }))} placeholder="e.g. AWALIFE at KSFM Conference 2025" />
                      </div>
                      <div className="space-y-2">
                        <Label>Excerpt</Label>
                        <Textarea value={newNews.excerpt} onChange={e => setNewNews(c => ({ ...c, excerpt: e.target.value }))} rows={3} placeholder="Brief description of the news item..." />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select value={newNews.category} onValueChange={v => setNewNews(c => ({ ...c, category: v as NewsCategory }))}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {NEWS_CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                            </SelectContent>
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
                      <Button onClick={addNewsItem} disabled={!newNews.title.trim()} className="mt-2">
                        <Plus className="mr-2 h-4 w-4" /> Add News Item
                      </Button>
                    </div>

                    {/* Right: image upload */}
                    <div className="space-y-2">
                      <Label>Cover Image</Label>
                      {newNews.imageUrl ? (
                        <div className="relative rounded-lg overflow-hidden border border-border aspect-[4/3]">
                          <img src={newNews.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-7 w-7"
                            onClick={() => setNewNews(c => ({ ...c, imageUrl: '' }))}
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border aspect-[4/3] cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground font-medium">Click to upload</span>
                          <span className="text-xs text-muted-foreground">JPG, PNG, WebP</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => { const f = e.target.files?.[0]; if (f) void handleNewsImageUpload(f, 'new'); }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All News</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.news.length ? (
                    <div className="rounded-lg border border-border/40 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-14"></TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="w-28">Category</TableHead>
                            <TableHead className="w-28">Date</TableHead>
                            <TableHead className="w-32">Location</TableHead>
                            <TableHead className="w-24 text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.news.map(item => (
                            <TableRow key={item.id}>
                              <TableCell className="p-2">
                                {item.imageUrl ? (
                                  <img src={item.imageUrl} alt="" className="h-10 w-14 rounded object-cover" />
                                ) : (
                                  <div className="h-10 w-14 rounded bg-muted flex items-center justify-center">
                                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="font-medium">
                                <div className="max-w-xs truncate">{item.title}</div>
                                {item.excerpt && <div className="text-xs text-muted-foreground truncate max-w-xs mt-0.5">{item.excerpt}</div>}
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary/10 text-primary">
                                  {item.category}
                                </span>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {item.date ? new Date(item.date).toLocaleDateString() : '—'}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground truncate max-w-[120px]">{item.location || '—'}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingNews({ ...item })}>
                                    <Pencil className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => removeNewsItem(item.id)}>
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No news items yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ===== RESOURCES TAB ===== */}
            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Resource</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Resource kind</Label>
                      <Select value={newResource.kind} onValueChange={v => setNewResource(c => ({ ...c, kind: v as ResourceKind }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {RESOURCE_KIND_CONFIG.map(k => <SelectItem key={k.id} value={k.id}>{k.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Product</Label>
                      <Select value={newResource.productId} onValueChange={v => setNewResource(c => ({ ...c, productId: v as ResourceProductId }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {RESOURCE_PRODUCT_OPTIONS.map(p => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input value={newResource.title} onChange={e => setNewResource(c => ({ ...c, title: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>{selectedKindConfig.summaryLabel}</Label>
                      <Textarea value={newResource.summary} onChange={e => setNewResource(c => ({ ...c, summary: e.target.value }))} rows={2} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Resource source</Label>
                      <Select value={newResource.mediaType} onValueChange={v => setNewResource(c => ({ ...c, mediaType: v as ResourceMediaType, mediaUrl: '', mediaName: '', mediaMime: '' }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upload">Upload file</SelectItem>
                          <SelectItem value="link">External link</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      {newResource.mediaType === 'link' ? (
                        <>
                          <Label>Resource link *</Label>
                          <Input value={newResource.mediaUrl} onChange={e => setNewResource(c => ({ ...c, mediaUrl: e.target.value }))} placeholder="https://" />
                        </>
                      ) : (
                        <>
                          <Label>Upload file *</Label>
                          <Input type="file" onChange={e => { const f = e.target.files?.[0]; if (f) void handleNewResourceFile(f); }} />
                          {newResource.mediaName && <p className="text-xs text-muted-foreground">Selected: {newResource.mediaName}</p>}
                        </>
                      )}
                    </div>
                  </div>
                  <Button onClick={addResource} disabled={isAddResourceDisabled}>
                    <Plus className="mr-2 h-4 w-4" /> Add Resource
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.resources.length ? (
                    <div className="rounded-lg border border-border/40 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="w-28">Kind</TableHead>
                            <TableHead className="w-36">Product</TableHead>
                            <TableHead className="w-20">Source</TableHead>
                            <TableHead className="w-24 text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.resources.map(resource => (
                            <TableRow key={resource.id}>
                              <TableCell className="font-medium">
                                <div className="max-w-xs truncate">{resource.title}</div>
                                {resource.summary && <div className="text-xs text-muted-foreground truncate max-w-xs mt-0.5">{resource.summary}</div>}
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-secondary text-foreground">
                                  {kindLabelMap[resource.kind] || resource.kind}
                                </span>
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground truncate max-w-[140px]">
                                {productLabelMap[resource.productId] || resource.productId}
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                  <FileText className="h-3 w-3" />
                                  {resource.mediaType === 'link' ? 'Link' : 'File'}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingResource({ ...resource })}>
                                    <Pencil className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => removeResource(resource.id)}>
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No resources added yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ===== FAQ TAB ===== */}
            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add FAQ Item</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={addFaqItem}>
                    <Plus className="mr-2 h-4 w-4" /> Add FAQ Item
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All FAQ Items</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.faq.items.length ? (
                    <div className="rounded-lg border border-border/40 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Question</TableHead>
                            <TableHead className="w-[40%]">Answer</TableHead>
                            <TableHead className="w-24 text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.faq.items.map(item => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">
                                <div className="max-w-sm truncate">{item.question}</div>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                <div className="max-w-sm truncate">{item.answer}</div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingFaq({ ...item })}>
                                    <Pencil className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => removeFaqItem(item.id)}>
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No FAQ items yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ===== EDIT NEWS DIALOG ===== */}
      <Dialog open={!!editingNews} onOpenChange={open => { if (!open) setEditingNews(null); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit News Item</DialogTitle>
          </DialogHeader>
          {editingNews && (
            <div className="grid md:grid-cols-[1fr_200px] gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={editingNews.title} onChange={e => setEditingNews(c => c ? { ...c, title: e.target.value } : c)} />
                </div>
                <div className="space-y-2">
                  <Label>Excerpt</Label>
                  <Textarea value={editingNews.excerpt} onChange={e => setEditingNews(c => c ? { ...c, excerpt: e.target.value } : c)} rows={3} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={editingNews.category} onValueChange={v => setEditingNews(c => c ? { ...c, category: v as NewsCategory } : c)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {NEWS_CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" value={editingNews.date} onChange={e => setEditingNews(c => c ? { ...c, date: e.target.value } : c)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input value={editingNews.location} onChange={e => setEditingNews(c => c ? { ...c, location: e.target.value } : c)} />
                  </div>
                </div>
              </div>
              {/* Image upload in edit dialog */}
              <div className="space-y-2">
                <Label>Cover Image</Label>
                {editingNews.imageUrl ? (
                  <div className="relative rounded-lg overflow-hidden border border-border aspect-[4/3]">
                    <img src={editingNews.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7"
                      onClick={() => setEditingNews(c => c ? { ...c, imageUrl: '' } : c)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-border aspect-[4/3] cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium">Upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) void handleNewsImageUpload(f, 'edit'); }}
                    />
                  </label>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingNews(null)}>Cancel</Button>
            <Button onClick={saveEditingNews}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== EDIT RESOURCE DIALOG ===== */}
      <Dialog open={!!editingResource} onOpenChange={open => { if (!open) setEditingResource(null); }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
          </DialogHeader>
          {editingResource && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Resource kind</Label>
                  <Select value={editingResource.kind} onValueChange={v => setEditingResource(c => c ? { ...c, kind: v as ResourceKind } : c)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{RESOURCE_KIND_CONFIG.map(k => <SelectItem key={k.id} value={k.id}>{k.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Product</Label>
                  <Select value={editingResource.productId} onValueChange={v => setEditingResource(c => c ? { ...c, productId: v as ResourceProductId } : c)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{RESOURCE_PRODUCT_OPTIONS.map(p => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={editingResource.title} onChange={e => setEditingResource(c => c ? { ...c, title: e.target.value } : c)} />
              </div>
              <div className="space-y-2">
                <Label>Summary</Label>
                <Textarea value={editingResource.summary} onChange={e => setEditingResource(c => c ? { ...c, summary: e.target.value } : c)} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Media URL</Label>
                <Input value={editingResource.mediaUrl} onChange={e => setEditingResource(c => c ? { ...c, mediaUrl: e.target.value } : c)} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingResource(null)}>Cancel</Button>
            <Button onClick={saveEditingResource}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== EDIT FAQ DIALOG ===== */}
      <Dialog open={!!editingFaq} onOpenChange={open => { if (!open) setEditingFaq(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit FAQ Item</DialogTitle>
          </DialogHeader>
          {editingFaq && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Question</Label>
                <Input value={editingFaq.question} onChange={e => setEditingFaq(c => c ? { ...c, question: e.target.value } : c)} />
              </div>
              <div className="space-y-2">
                <Label>Answer</Label>
                <Textarea value={editingFaq.answer} onChange={e => setEditingFaq(c => c ? { ...c, answer: e.target.value } : c)} rows={4} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingFaq(null)}>Cancel</Button>
            <Button onClick={saveEditingFaq}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ResourcesAdmin;
