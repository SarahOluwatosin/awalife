import { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
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
import { Progress } from '@/components/ui/progress';
import { Trash2, Plus, Pencil, FileText, Upload, X, Image as ImageIcon, LogOut, RefreshCw } from 'lucide-react';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';
import { useAuth } from '@/contexts/AuthContext';
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
import { uploadToStorage, uploadAndReplace } from '@/lib/storage';
import { validateImageFile, validateResourceFile } from '@/lib/validation';
import { IMAGE_ASSET_CONFIG } from '@/lib/images';

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

// ---- Site Images Manager ----
const STORAGE_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media/assets`;

const SiteImagesManager = () => {
  const [cacheBuster, setCacheBuster] = useState<Record<string, number>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const categories = [...new Set(IMAGE_ASSET_CONFIG.map(c => c.category))];

  const getImageUrl = (fileName: string, key: string) => {
    const bust = cacheBuster[key];
    return `${STORAGE_BASE_URL}/${fileName}${bust ? `?t=${bust}` : ''}`;
  };

  const handleReplace = async (asset: typeof IMAGE_ASSET_CONFIG[0], file: File) => {
    const error = validateImageFile(file);
    if (error) { toast({ title: error, variant: 'destructive' }); return; }
    setUploading(asset.key);
    try {
      await uploadAndReplace('media', `assets/${asset.fileName}`, file);
      setCacheBuster(prev => ({ ...prev, [asset.key]: Date.now() }));
      toast({ title: `${asset.label} replaced successfully` });
    } catch {
      toast({ title: 'Failed to replace image', variant: 'destructive' });
    } finally {
      setUploading(null);
    }
  };

  return (
    <>
      {categories.map(category => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="text-lg">{category}</CardTitle>
            <CardDescription>Click "Replace" to upload a new version of any image.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {IMAGE_ASSET_CONFIG.filter(a => a.category === category).map(asset => (
                <div key={asset.key} className="space-y-2">
                  <div className="relative aspect-[4/3] rounded-lg border border-border overflow-hidden bg-muted">
                    <img
                      src={getImageUrl(asset.fileName, asset.key)}
                      alt={asset.label}
                      className="w-full h-full object-contain"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    {uploading === asset.key && (
                      <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-2">
                        <RefreshCw className="h-5 w-5 animate-spin text-primary" />
                        <span className="text-xs text-muted-foreground">Uploading...</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-foreground truncate">{asset.label}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 h-7 text-xs"
                      disabled={uploading !== null}
                      onClick={() => fileInputRefs.current[asset.key]?.click()}
                    >
                      Replace
                    </Button>
                    <input
                      ref={el => { fileInputRefs.current[asset.key] = el; }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) void handleReplace(asset, f); e.target.value = ''; }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

const ResourcesAdmin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { data, loading: dataLoading, addNews, updateNews, deleteNews, addResource, updateResource, deleteResource, addFaq, updateFaq, deleteFaq } = useResourcesCMS();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Resource form
  const [newResource, setNewResource] = useState<ResourceFormState>({
    title: '', summary: '', kind: defaultKind, productId: defaultProduct,
    mediaType: 'upload', mediaUrl: '', mediaName: '', mediaMime: '',
  });

  // News form
  const [newNews, setNewNews] = useState<Omit<NewsItem, 'id'>>({
    title: '', excerpt: '', content: '', date: new Date().toISOString().slice(0, 10), category: 'Exhibition', location: '', imageUrl: '',
  });

  // Edit dialogs
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [editingFaq, setEditingFaq] = useState<{ id: string; question: string; answer: string } | null>(null);
  const [saving, setSaving] = useState(false);

  if (authLoading) {
    return <Layout><div className="pt-32 pb-24 text-center"><p className="text-muted-foreground">Loading...</p></div></Layout>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  // ---- Resource helpers ----
  const handleNewResourceFile = async (file: File) => {
    const error = validateResourceFile(file);
    if (error) { toast({ title: error, variant: 'destructive' }); return; }
    try {
      const url = await uploadToStorage('media', 'resources', file);
      setNewResource(c => ({ ...c, mediaType: 'upload', mediaUrl: url, mediaName: file.name, mediaMime: file.type }));
    } catch {
      toast({ title: 'Failed to upload file', variant: 'destructive' });
    }
  };

  const handleRemoveResource = async (id: string) => {
    setSaving(true);
    await deleteResource(id);
    setSaving(false);
    toast({ title: 'Resource removed' });
  };

  const handleAddResource = async () => {
    if (!newResource.title.trim() || !newResource.mediaUrl.trim()) return;
    setSaving(true);
    await addResource({
      title: newResource.title.trim(), summary: newResource.summary.trim(),
      kind: newResource.kind, productId: newResource.productId, mediaType: newResource.mediaType,
      mediaUrl: newResource.mediaUrl.trim(), mediaName: newResource.mediaName.trim(), mediaMime: newResource.mediaMime.trim(),
    });
    setNewResource(c => ({ ...c, title: '', summary: '', mediaUrl: '', mediaName: '', mediaMime: '' }));
    setSaving(false);
    toast({ title: 'Resource added' });
  };

  const handleSaveResource = async () => {
    if (!editingResource) return;
    setSaving(true);
    await updateResource(editingResource);
    setEditingResource(null);
    setSaving(false);
    toast({ title: 'Resource updated' });
  };

  // ---- News image upload ----
  const handleNewsImageUpload = async (file: File, target: 'new' | 'edit') => {
    const error = validateImageFile(file);
    if (error) { toast({ title: error, variant: 'destructive' }); return; }
    try {
      const url = await uploadToStorage('media', 'news', file);
      if (target === 'new') {
        setNewNews(c => ({ ...c, imageUrl: url }));
      } else {
        setEditingNews(c => c ? { ...c, imageUrl: url } : c);
      }
    } catch {
      toast({ title: 'Failed to upload image', variant: 'destructive' });
    }
  };

  // ---- News helpers ----
  const handleAddNews = async () => {
    if (!newNews.title.trim()) return;
    setSaving(true);
    await addNews({ ...newNews, title: newNews.title.trim(), excerpt: newNews.excerpt.trim() });
    setNewNews({ title: '', excerpt: '', content: '', date: new Date().toISOString().slice(0, 10), category: 'Exhibition', location: '', imageUrl: '' });
    setSaving(false);
    toast({ title: 'News item added' });
  };

  const handleRemoveNews = async (id: string) => {
    setSaving(true);
    await deleteNews(id);
    setSaving(false);
    toast({ title: 'News item removed' });
  };

  const handleSaveNews = async () => {
    if (!editingNews) return;
    setSaving(true);
    await updateNews(editingNews);
    setEditingNews(null);
    setSaving(false);
    toast({ title: 'News item updated' });
  };

  // ---- FAQ helpers ----
  const handleAddFaq = async () => {
    setSaving(true);
    await addFaq({ question: 'New question', answer: 'New answer' });
    setSaving(false);
    toast({ title: 'FAQ item added' });
  };

  const handleRemoveFaq = async (id: string) => {
    setSaving(true);
    await deleteFaq(id);
    setSaving(false);
    toast({ title: 'FAQ item removed' });
  };

  const handleSaveFaq = async () => {
    if (!editingFaq) return;
    setSaving(true);
    await updateFaq(editingFaq);
    setEditingFaq(null);
    setSaving(false);
    toast({ title: 'FAQ item updated' });
  };

  const selectedKindConfig = RESOURCE_KIND_CONFIG.find(k => k.id === newResource.kind) || RESOURCE_KIND_CONFIG[0];
  const isAddResourceDisabled = saving || !newResource.title.trim() || !newResource.mediaUrl.trim() || (newResource.mediaType === 'upload' && !newResource.mediaName.trim());

  return (
    <Layout>
      <section className="pt-32 pb-8 lg:pt-36">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-2">Admin</span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Content Management</h1>
              <p className="text-muted-foreground mt-2">Manage Resources and News. Changes are saved to the database.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => signOut()} className="shrink-0">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          {dataLoading ? (
            <p className="text-center text-muted-foreground py-12">Loading data...</p>
          ) : (
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="mb-8 w-full justify-start">
              <TabsTrigger value="news">News ({data.news.length})</TabsTrigger>
              <TabsTrigger value="resources">Resources ({data.resources.length})</TabsTrigger>
              <TabsTrigger value="faq">FAQ ({data.faq.items.length})</TabsTrigger>
              <TabsTrigger value="images">Site Images</TabsTrigger>
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
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Title *</Label>
                        <Input value={newNews.title} onChange={e => setNewNews(c => ({ ...c, title: e.target.value }))} placeholder="e.g. AWALIFE at KSFM Conference 2025" />
                      </div>
                      <div className="space-y-2">
                        <Label>Excerpt</Label>
                        <Textarea value={newNews.excerpt} onChange={e => setNewNews(c => ({ ...c, excerpt: e.target.value }))} rows={2} placeholder="Brief description..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Full Article Content</Label>
                        <Textarea value={newNews.content} onChange={e => setNewNews(c => ({ ...c, content: e.target.value }))} rows={8} placeholder="Write the full article content here..." />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
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
                      <Button onClick={handleAddNews} disabled={saving || !newNews.title.trim()} className="mt-2">
                        <Plus className="mr-2 h-4 w-4" /> Add News Item
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Cover Image</Label>
                      {newNews.imageUrl ? (
                        <div className="relative rounded-lg overflow-hidden border border-border aspect-[4/3]">
                          <img src={newNews.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                          <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => setNewNews(c => ({ ...c, imageUrl: '' }))}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border aspect-[4/3] cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground font-medium">Click to upload</span>
                          <span className="text-xs text-muted-foreground">JPG, PNG, WebP</span>
                          <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) void handleNewsImageUpload(f, 'new'); }} />
                        </label>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>All News</CardTitle></CardHeader>
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
                                  <div className="h-10 w-14 rounded bg-muted flex items-center justify-center"><ImageIcon className="h-4 w-4 text-muted-foreground" /></div>
                                )}
                              </TableCell>
                              <TableCell className="font-medium">
                                <div className="max-w-xs truncate">{item.title}</div>
                                {item.excerpt && <div className="text-xs text-muted-foreground truncate max-w-xs mt-0.5">{item.excerpt}</div>}
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary/10 text-primary">{item.category}</span>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">{item.date ? new Date(item.date).toLocaleDateString() : '—'}</TableCell>
                              <TableCell className="text-sm text-muted-foreground truncate max-w-[120px]">{item.location || '—'}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingNews({ ...item })}><Pencil className="h-3.5 w-3.5" /></Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" disabled={saving} onClick={() => handleRemoveNews(item.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
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
                <CardHeader><CardTitle>Add Resource</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Resource kind</Label>
                      <Select value={newResource.kind} onValueChange={v => setNewResource(c => ({ ...c, kind: v as ResourceKind }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{RESOURCE_KIND_CONFIG.map(k => <SelectItem key={k.id} value={k.id}>{k.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Product</Label>
                      <Select value={newResource.productId} onValueChange={v => setNewResource(c => ({ ...c, productId: v as ResourceProductId }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{RESOURCE_PRODUCT_OPTIONS.map(p => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}</SelectContent>
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
                  <Button onClick={handleAddResource} disabled={isAddResourceDisabled}>
                    <Plus className="mr-2 h-4 w-4" /> Add Resource
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>All Resources</CardTitle></CardHeader>
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
                                <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-secondary text-foreground">{kindLabelMap[resource.kind] || resource.kind}</span>
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground truncate max-w-[140px]">{productLabelMap[resource.productId] || resource.productId}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><FileText className="h-3 w-3" />{resource.mediaType === 'link' ? 'Link' : 'File'}</span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingResource({ ...resource })}><Pencil className="h-3.5 w-3.5" /></Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" disabled={saving} onClick={() => handleRemoveResource(resource.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
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
                <CardHeader><CardTitle>Add FAQ Item</CardTitle></CardHeader>
                <CardContent>
                  <Button onClick={handleAddFaq} disabled={saving}>
                    <Plus className="mr-2 h-4 w-4" /> Add FAQ Item
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>All FAQ Items</CardTitle></CardHeader>
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
                              <TableCell className="font-medium"><div className="max-w-sm truncate">{item.question}</div></TableCell>
                              <TableCell className="text-sm text-muted-foreground"><div className="max-w-sm truncate">{item.answer}</div></TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingFaq({ ...item })}><Pencil className="h-3.5 w-3.5" /></Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" disabled={saving} onClick={() => handleRemoveFaq(item.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
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

            {/* ===== SITE IMAGES TAB ===== */}
            <TabsContent value="images" className="space-y-6">
              <SiteImagesManager />
            </TabsContent>
          </Tabs>
          )}
        </div>
      </section>

      {/* ===== EDIT NEWS DIALOG ===== */}
      <Dialog open={!!editingNews} onOpenChange={open => { if (!open) setEditingNews(null); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Edit News Item</DialogTitle></DialogHeader>
          {editingNews && (
            <div className="grid md:grid-cols-[1fr_200px] gap-6">
              <div className="space-y-4">
                <div className="space-y-2"><Label>Title</Label><Input value={editingNews.title} onChange={e => setEditingNews(c => c ? { ...c, title: e.target.value } : c)} /></div>
                <div className="space-y-2"><Label>Excerpt</Label><Textarea value={editingNews.excerpt} onChange={e => setEditingNews(c => c ? { ...c, excerpt: e.target.value } : c)} rows={2} /></div>
                <div className="space-y-2"><Label>Full Article Content</Label><Textarea value={editingNews.content || ''} onChange={e => setEditingNews(c => c ? { ...c, content: e.target.value } : c)} rows={8} /></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={editingNews.category} onValueChange={v => setEditingNews(c => c ? { ...c, category: v as NewsCategory } : c)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{NEWS_CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>Date</Label><Input type="date" value={editingNews.date} onChange={e => setEditingNews(c => c ? { ...c, date: e.target.value } : c)} /></div>
                  <div className="space-y-2"><Label>Location</Label><Input value={editingNews.location} onChange={e => setEditingNews(c => c ? { ...c, location: e.target.value } : c)} /></div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cover Image</Label>
                {editingNews.imageUrl ? (
                  <div className="relative rounded-lg overflow-hidden border border-border aspect-[4/3]">
                    <img src={editingNews.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => setEditingNews(c => c ? { ...c, imageUrl: '' } : c)}><X className="h-3.5 w-3.5" /></Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-border aspect-[4/3] cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium">Upload image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) void handleNewsImageUpload(f, 'edit'); }} />
                  </label>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingNews(null)}>Cancel</Button>
            <Button onClick={handleSaveNews} disabled={saving}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== EDIT RESOURCE DIALOG ===== */}
      <Dialog open={!!editingResource} onOpenChange={open => { if (!open) setEditingResource(null); }}>
        <DialogContent className="max-w-xl">
          <DialogHeader><DialogTitle>Edit Resource</DialogTitle></DialogHeader>
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
              <div className="space-y-2"><Label>Title</Label><Input value={editingResource.title} onChange={e => setEditingResource(c => c ? { ...c, title: e.target.value } : c)} /></div>
              <div className="space-y-2"><Label>Summary</Label><Textarea value={editingResource.summary} onChange={e => setEditingResource(c => c ? { ...c, summary: e.target.value } : c)} rows={2} /></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Resource source</Label>
                  <Select value={editingResource.mediaType} onValueChange={v => setEditingResource(c => c ? { ...c, mediaType: v as ResourceMediaType, mediaUrl: '', mediaName: '', mediaMime: '' } : c)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upload">Upload file</SelectItem>
                      <SelectItem value="link">External link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  {editingResource.mediaType === 'link' ? (
                    <>
                      <Label>Resource link</Label>
                      <Input value={editingResource.mediaUrl} onChange={e => setEditingResource(c => c ? { ...c, mediaUrl: e.target.value } : c)} placeholder="https://" />
                    </>
                  ) : (
                    <>
                      <Label>Upload file</Label>
                      <Input type="file" onChange={async e => { const f = e.target.files?.[0]; if (f) { const valErr = validateResourceFile(f); if (valErr) { toast({ title: valErr, variant: 'destructive' }); return; } try { const url = await uploadToStorage('media', 'resources', f); setEditingResource(c => c ? { ...c, mediaType: 'upload', mediaUrl: url, mediaName: f.name, mediaMime: f.type } : c); } catch { toast({ title: 'Failed to upload file', variant: 'destructive' }); } } }} />
                      {editingResource.mediaName && <p className="text-xs text-muted-foreground">Current: {editingResource.mediaName}</p>}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingResource(null)}>Cancel</Button>
            <Button onClick={handleSaveResource} disabled={saving}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== EDIT FAQ DIALOG ===== */}
      <Dialog open={!!editingFaq} onOpenChange={open => { if (!open) setEditingFaq(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Edit FAQ Item</DialogTitle></DialogHeader>
          {editingFaq && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>Question</Label><Input value={editingFaq.question} onChange={e => setEditingFaq(c => c ? { ...c, question: e.target.value } : c)} /></div>
              <div className="space-y-2"><Label>Answer</Label><Textarea value={editingFaq.answer} onChange={e => setEditingFaq(c => c ? { ...c, answer: e.target.value } : c)} rows={4} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingFaq(null)}>Cancel</Button>
            <Button onClick={handleSaveFaq} disabled={saving}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ResourcesAdmin;
