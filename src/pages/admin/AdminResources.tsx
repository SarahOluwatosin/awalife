import { useState } from 'react';
import { Trash2, Plus, Pencil, FileText, X } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';
import {
  RESOURCE_KIND_CONFIG, RESOURCE_PRODUCT_OPTIONS,
} from '@/data/resources';
import type { ResourceItem, ResourceKind, ResourceMediaType, ResourceProductId } from '@/data/resources';
import { toast } from '@/hooks/use-toast';
import { uploadToStorage } from '@/lib/storage';
import { validateResourceFile } from '@/lib/validation';

type ResourceFormState = {
  title: string; summary: string; kind: ResourceKind; productId: ResourceProductId;
  mediaType: ResourceMediaType; mediaUrl: string; mediaName: string; mediaMime: string;
};

const defaultKind = (RESOURCE_KIND_CONFIG[0]?.id || 'how-to') as ResourceKind;
const defaultProduct = (RESOURCE_PRODUCT_OPTIONS[0]?.id || 'all') as ResourceProductId;
const kindLabelMap = RESOURCE_KIND_CONFIG.reduce<Record<string, string>>((a, k) => { a[k.id] = k.label; return a; }, {});
const productLabelMap = RESOURCE_PRODUCT_OPTIONS.reduce<Record<string, string>>((a, p) => { a[p.id] = p.label; return a; }, {});

const emptyResource = (): ResourceFormState => ({
  title: '', summary: '', kind: defaultKind, productId: defaultProduct,
  mediaType: 'upload', mediaUrl: '', mediaName: '', mediaMime: '',
});

const AdminResources = () => {
  const { data, addResource, updateResource, deleteResource, addFaq, updateFaq, deleteFaq } = useResourcesCMS();

  const [newResource, setNewResource] = useState<ResourceFormState>(emptyResource());
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [editingFaq, setEditingFaq] = useState<{ id: string; question: string; answer: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const selectedKindConfig = RESOURCE_KIND_CONFIG.find(k => k.id === newResource.kind) || RESOURCE_KIND_CONFIG[0];

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

  const handleAddResource = async (status: 'published' | 'draft') => {
    if (!newResource.title.trim() || !newResource.mediaUrl.trim()) return;
    setSaving(true);
    await addResource({
      title: newResource.title.trim(), summary: newResource.summary.trim(),
      kind: newResource.kind, productId: newResource.productId, mediaType: newResource.mediaType,
      mediaUrl: newResource.mediaUrl.trim(), mediaName: newResource.mediaName.trim(), mediaMime: newResource.mediaMime.trim(),
      status,
    });
    setNewResource(emptyResource());
    setShowAddForm(false);
    setSaving(false);
    toast({ title: status === 'draft' ? 'Resource saved as draft' : 'Resource published' });
  };

  const handleSaveResource = async () => {
    if (!editingResource) return;
    setSaving(true);
    await updateResource(editingResource);
    setEditingResource(null);
    setSaving(false);
    toast({ title: 'Resource updated' });
  };

  const handleRemoveResource = async (id: string) => {
    setSaving(true);
    await deleteResource(id);
    setSaving(false);
    toast({ title: 'Resource removed' });
  };

  const handleAddFaq = async () => {
    setSaving(true);
    await addFaq({ question: 'New question', answer: 'New answer' });
    setSaving(false);
    toast({ title: 'FAQ item added' });
  };

  const handleSaveFaq = async () => {
    if (!editingFaq) return;
    setSaving(true);
    await updateFaq(editingFaq);
    setEditingFaq(null);
    setSaving(false);
    toast({ title: 'FAQ item updated' });
  };

  const handleRemoveFaq = async (id: string) => {
    setSaving(true);
    await deleteFaq(id);
    setSaving(false);
    toast({ title: 'FAQ item removed' });
  };

  const isAddDisabled = saving || !newResource.title.trim() || !newResource.mediaUrl.trim() || (newResource.mediaType === 'upload' && !newResource.mediaName.trim());

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Resources</h1>
            <p className="text-muted-foreground text-sm mt-1">{data.resources.length} resource{data.resources.length !== 1 ? 's' : ''} · {data.faq.items.length} FAQ item{data.faq.items.length !== 1 ? 's' : ''}</p>
          </div>
          {!showAddForm && (
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Resource
            </Button>
          )}
        </div>

        <Tabs defaultValue="resources" className="w-full">
          <TabsList>
            <TabsTrigger value="resources">Resources ({data.resources.length})</TabsTrigger>
            <TabsTrigger value="faq">FAQ ({data.faq.items.length})</TabsTrigger>
          </TabsList>

          {/* ===== RESOURCES ===== */}
          <TabsContent value="resources" className="space-y-6 mt-6">
            {showAddForm && (
              <Card>
                <CardHeader><CardTitle>New Resource</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
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
                      <Label>{selectedKindConfig?.summaryLabel ?? 'Summary'}</Label>
                      <Textarea value={newResource.summary} onChange={e => setNewResource(c => ({ ...c, summary: e.target.value }))} rows={2} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Source type</Label>
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
                          <Label>Resource URL *</Label>
                          <Input value={newResource.mediaUrl} onChange={e => setNewResource(c => ({ ...c, mediaUrl: e.target.value, mediaName: e.target.value, mediaMime: 'text/html' }))} placeholder="https://" />
                        </>
                      ) : (
                        <>
                          <Label>Upload file *</Label>
                          <Input type="file" onChange={async e => { const f = e.target.files?.[0]; if (f) await handleNewResourceFile(f); }} />
                          {newResource.mediaName && <p className="text-xs text-muted-foreground">{newResource.mediaName}</p>}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <Button variant="destructive" onClick={() => { setNewResource(emptyResource()); setShowAddForm(false); }} disabled={saving}>
                      <X className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={() => handleAddResource('draft')} disabled={isAddDisabled}>
                        Save as Draft
                      </Button>
                      <Button onClick={() => handleAddResource('published')} disabled={isAddDisabled}>
                        <Plus className="mr-2 h-4 w-4" /> Publish
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader><CardTitle>All Resources</CardTitle></CardHeader>
              <CardContent>
                {data.resources.length ? (
                  <div className="rounded-lg border border-border/40 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="w-44">Category</TableHead>
                          <TableHead className="w-36">Product</TableHead>
                          <TableHead className="w-20">Source</TableHead>
                          <TableHead className="w-24">Status</TableHead>
                          <TableHead className="w-20 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.resources.map(resource => (
                          <TableRow key={resource.id}>
                            <TableCell className="font-medium">
                              <div className="max-w-xs truncate">{resource.title}</div>
                              {resource.summary && <div className="text-xs text-muted-foreground truncate max-w-xs mt-0.5">{resource.summary}</div>}
                            </TableCell>
                            <TableCell><span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-secondary text-foreground">{kindLabelMap[resource.kind] || resource.kind}</span></TableCell>
                            <TableCell className="text-xs text-muted-foreground truncate max-w-[140px]">{productLabelMap[resource.productId] || resource.productId}</TableCell>
                            <TableCell><span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><FileText className="h-3 w-3" />{resource.mediaType === 'link' ? 'Link' : 'File'}</span></TableCell>
                            <TableCell>
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${resource.status === 'draft' ? 'bg-amber-500/10 text-amber-600' : 'bg-green-500/10 text-green-600'}`}>
                                {resource.status === 'draft' ? 'Draft' : 'Published'}
                              </span>
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
                  <p className="text-muted-foreground text-center py-8">No resources yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== FAQ ===== */}
          <TabsContent value="faq" className="space-y-6 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>FAQ Items</CardTitle>
                <Button size="sm" onClick={handleAddFaq} disabled={saving}>
                  <Plus className="mr-2 h-4 w-4" /> Add FAQ
                </Button>
              </CardHeader>
              <CardContent>
                {data.faq.items.length ? (
                  <div className="rounded-lg border border-border/40 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Question</TableHead>
                          <TableHead className="w-[40%]">Answer</TableHead>
                          <TableHead className="w-20 text-right">Actions</TableHead>
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
        </Tabs>
      </div>

      {/* Edit Resource Dialog */}
      <Dialog open={!!editingResource} onOpenChange={open => { if (!open) setEditingResource(null); }}>
        <DialogContent className="max-w-xl">
          <DialogHeader><DialogTitle>Edit Resource</DialogTitle></DialogHeader>
          {editingResource && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
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
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={editingResource.status ?? 'published'} onValueChange={v => setEditingResource(c => c ? { ...c, status: v as 'published' | 'draft' } : c)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Source type</Label>
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
                      <Label>Resource URL</Label>
                      <Input value={editingResource.mediaUrl} onChange={e => setEditingResource(c => c ? { ...c, mediaUrl: e.target.value } : c)} placeholder="https://" />
                    </>
                  ) : (
                    <>
                      <Label>Replace file</Label>
                      <Input type="file" onChange={async e => {
                        const f = e.target.files?.[0];
                        if (f) {
                          const err = validateResourceFile(f);
                          if (err) { toast({ title: err, variant: 'destructive' }); return; }
                          try {
                            const url = await uploadToStorage('media', 'resources', f);
                            setEditingResource(c => c ? { ...c, mediaUrl: url, mediaName: f.name, mediaMime: f.type } : c);
                          } catch {
                            toast({ title: 'Failed to upload file', variant: 'destructive' });
                          }
                        }
                      }} />
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

      {/* Edit FAQ Dialog */}
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
    </AdminLayout>
  );
};

export default AdminResources;
