import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Plus, RotateCcw } from 'lucide-react';
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

const ResourcesAdmin = () => {
  const { data, setData, resetData } = useResourcesCMS();

  // Resource form
  const [newResource, setNewResource] = useState<ResourceFormState>({
    title: '', summary: '', kind: defaultKind, productId: defaultProduct,
    mediaType: 'upload', mediaUrl: '', mediaName: '', mediaMime: '',
  });

  // News form
  const [newNews, setNewNews] = useState<Omit<NewsItem, 'id'>>({
    title: '', excerpt: '', date: '', category: 'Exhibition', location: '', imageUrl: '',
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // ---- Resource helpers ----
  const updateResourceField = (id: string, field: keyof ResourceItem, value: string) => {
    setData(c => ({ ...c, resources: c.resources.map(r => r.id === id ? { ...r, [field]: value } : r) }));
  };

  const handleNewResourceFile = async (file: File) => {
    const dataUrl = await readFileAsDataUrl(file);
    setNewResource(c => ({ ...c, mediaType: 'upload', mediaUrl: dataUrl, mediaName: file.name, mediaMime: file.type }));
  };

  const handleExistingResourceFile = async (id: string, file: File) => {
    const dataUrl = await readFileAsDataUrl(file);
    setData(c => ({
      ...c, resources: c.resources.map(r => r.id === id ? { ...r, mediaType: 'upload', mediaUrl: dataUrl, mediaName: file.name, mediaMime: file.type } : r),
    }));
  };

  const updateResourceMediaType = (id: string, mediaType: ResourceMediaType) => {
    setData(c => ({
      ...c, resources: c.resources.map(r => r.id === id ? { ...r, mediaType, mediaUrl: '', mediaName: '', mediaMime: '' } : r),
    }));
  };

  const removeResource = (id: string) => {
    setData(c => ({ ...c, resources: c.resources.filter(r => r.id !== id) }));
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

  // ---- News helpers ----
  const addNewsItem = () => {
    if (!newNews.title.trim()) return;
    const item: NewsItem = { id: createId('news'), ...newNews, title: newNews.title.trim(), excerpt: newNews.excerpt.trim() };
    setData(c => ({ ...c, news: [item, ...c.news] }));
    setNewNews({ title: '', excerpt: '', date: '', category: 'Exhibition', location: '', imageUrl: '' });
    toast({ title: 'News item added' });
  };

  const updateNewsField = (id: string, field: keyof NewsItem, value: string) => {
    setData(c => ({ ...c, news: c.news.map(n => n.id === id ? { ...n, [field]: value } : n) }));
  };

  const removeNewsItem = (id: string) => {
    setData(c => ({ ...c, news: c.news.filter(n => n.id !== id) }));
  };

  // ---- FAQ helpers ----
  const addFaqItem = () => {
    setData(c => ({ ...c, faq: { ...c.faq, items: [...c.faq.items, { id: createId('faq'), question: 'New question', answer: 'New answer' }] } }));
  };

  const updateFaqItem = (id: string, field: 'question' | 'answer', value: string) => {
    setData(c => ({ ...c, faq: { ...c.faq, items: c.faq.items.map(i => i.id === id ? { ...i, [field]: value } : i) } }));
  };

  const removeFaqItem = (id: string) => {
    setData(c => ({ ...c, faq: { ...c.faq, items: c.faq.items.filter(i => i.id !== id) } }));
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
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="hero-cta">Hero & CTA</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            {/* ===== NEWS TAB ===== */}
            <TabsContent value="news" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add News Item</CardTitle>
                  <CardDescription>Create a new news article for the News Center page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input value={newNews.title} onChange={e => setNewNews(c => ({ ...c, title: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={newNews.category} onValueChange={v => setNewNews(c => ({ ...c, category: v as NewsCategory }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {NEWS_CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Excerpt</Label>
                    <Textarea value={newNews.excerpt} onChange={e => setNewNews(c => ({ ...c, excerpt: e.target.value }))} rows={3} />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" value={newNews.date} onChange={e => setNewNews(c => ({ ...c, date: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input value={newNews.location} onChange={e => setNewNews(c => ({ ...c, location: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input value={newNews.imageUrl} onChange={e => setNewNews(c => ({ ...c, imageUrl: e.target.value }))} placeholder="https://" />
                    </div>
                  </div>
                  <Button onClick={addNewsItem} disabled={!newNews.title.trim()}>
                    <Plus className="mr-2 h-4 w-4" /> Add News Item
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Manage News ({data.news.length})</CardTitle>
                  <CardDescription>Edit or remove existing news items.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.news.length ? data.news.map(item => (
                    <div key={item.id} className="rounded-lg border border-border/40 p-4 space-y-3">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input value={item.title} onChange={e => updateNewsField(item.id, 'title', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select value={item.category} onValueChange={v => updateNewsField(item.id, 'category', v)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {NEWS_CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Excerpt</Label>
                        <Textarea value={item.excerpt} onChange={e => updateNewsField(item.id, 'excerpt', e.target.value)} rows={2} />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input type="date" value={item.date} onChange={e => updateNewsField(item.id, 'date', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input value={item.location} onChange={e => updateNewsField(item.id, 'location', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Image URL</Label>
                          <Input value={item.imageUrl} onChange={e => updateNewsField(item.id, 'imageUrl', e.target.value)} placeholder="https://" />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="destructive" size="sm" onClick={() => removeNewsItem(item.id)}>
                          <Trash2 className="mr-1 h-3 w-3" /> Remove
                        </Button>
                      </div>
                    </div>
                  )) : (
                    <p className="text-muted-foreground">No news items yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ===== RESOURCES TAB ===== */}
            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Resource</CardTitle>
                  <CardDescription>Add downloadable resources for the Resource Center page.</CardDescription>
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
                  <CardTitle>Manage Resources ({data.resources.length})</CardTitle>
                  <CardDescription>Edit or remove existing resources.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.resources.length ? data.resources.map(resource => {
                    const rk = RESOURCE_KIND_CONFIG.find(k => k.id === resource.kind) || RESOURCE_KIND_CONFIG[0];
                    return (
                      <div key={resource.id} className="rounded-lg border border-border/40 p-4 space-y-3">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Resource kind</Label>
                            <Select value={resource.kind} onValueChange={v => updateResourceField(resource.id, 'kind', v)}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>{RESOURCE_KIND_CONFIG.map(k => <SelectItem key={k.id} value={k.id}>{k.label}</SelectItem>)}</SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Product</Label>
                            <Select value={resource.productId} onValueChange={v => updateResourceField(resource.id, 'productId', v)}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>{RESOURCE_PRODUCT_OPTIONS.map(p => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}</SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input value={resource.title} onChange={e => updateResourceField(resource.id, 'title', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>{rk.summaryLabel}</Label>
                            <Textarea value={resource.summary} onChange={e => updateResourceField(resource.id, 'summary', e.target.value)} rows={2} />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Resource source</Label>
                            <Select value={resource.mediaType} onValueChange={v => updateResourceMediaType(resource.id, v as ResourceMediaType)}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="upload">Upload file</SelectItem>
                                <SelectItem value="link">External link</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            {resource.mediaType === 'link' ? (
                              <>
                                <Label>Resource link</Label>
                                <Input value={resource.mediaUrl} onChange={e => updateResourceField(resource.id, 'mediaUrl', e.target.value)} placeholder="https://" />
                              </>
                            ) : (
                              <>
                                <Label>Upload file</Label>
                                <Input type="file" onChange={e => { const f = e.target.files?.[0]; if (f) void handleExistingResourceFile(resource.id, f); }} />
                                {resource.mediaName && <p className="text-xs text-muted-foreground">Selected: {resource.mediaName}</p>}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="destructive" size="sm" onClick={() => removeResource(resource.id)}>
                            <Trash2 className="mr-1 h-3 w-3" /> Remove
                          </Button>
                        </div>
                      </div>
                    );
                  }) : (
                    <p className="text-muted-foreground">No resources added yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ===== HERO & CTA TAB ===== */}
            <TabsContent value="hero-cta" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Center Hero</CardTitle>
                  <CardDescription>Edit the hero section shown at the top of the Resources page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={data.hero.title} onChange={e => setData(c => ({ ...c, hero: { ...c.hero, title: e.target.value } }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={data.hero.description} onChange={e => setData(c => ({ ...c, hero: { ...c.hero, description: e.target.value } }))} rows={3} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input value={data.hero.imageUrl} onChange={e => setData(c => ({ ...c, hero: { ...c.hero, imageUrl: e.target.value } }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Image Alt Text</Label>
                      <Input value={data.hero.imageAlt} onChange={e => setData(c => ({ ...c, hero: { ...c.hero, imageAlt: e.target.value } }))} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Call to Action</CardTitle>
                  <CardDescription>Edit the CTA section shown at the bottom of Resources and News pages.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={data.cta.title} onChange={e => setData(c => ({ ...c, cta: { ...c.cta, title: e.target.value } }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={data.cta.description} onChange={e => setData(c => ({ ...c, cta: { ...c.cta, description: e.target.value } }))} rows={2} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Button Label</Label>
                      <Input value={data.cta.buttonLabel} onChange={e => setData(c => ({ ...c, cta: { ...c.cta, buttonLabel: e.target.value } }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Button URL</Label>
                      <Input value={data.cta.buttonUrl} onChange={e => setData(c => ({ ...c, cta: { ...c.cta, buttonUrl: e.target.value } }))} placeholder="/contact" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ===== FAQ TAB ===== */}
            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>FAQ Section</CardTitle>
                  <CardDescription>Manage frequently asked questions shown on the Resources page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input value={data.faq.title} onChange={e => setData(c => ({ ...c, faq: { ...c.faq, title: e.target.value } }))} />
                  </div>
                  <div className="space-y-4">
                    {data.faq.items.map(item => (
                      <div key={item.id} className="rounded-lg border border-border/40 p-4 space-y-3">
                        <div className="space-y-2">
                          <Label>Question</Label>
                          <Input value={item.question} onChange={e => updateFaqItem(item.id, 'question', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Answer</Label>
                          <Textarea value={item.answer} onChange={e => updateFaqItem(item.id, 'answer', e.target.value)} rows={2} />
                        </div>
                        <div className="flex justify-end">
                          <Button variant="destructive" size="sm" onClick={() => removeFaqItem(item.id)}>
                            <Trash2 className="mr-1 h-3 w-3" /> Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="secondary" onClick={addFaqItem}>
                    <Plus className="mr-2 h-4 w-4" /> Add FAQ Item
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default ResourcesAdmin;
