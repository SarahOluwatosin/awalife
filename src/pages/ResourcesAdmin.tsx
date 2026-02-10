import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';
import {
  RESOURCE_KIND_CONFIG,
  RESOURCE_PRODUCT_OPTIONS,
} from '@/data/resources';
import type {
  ResourceItem,
  ResourceKind,
  ResourceMediaType,
  ResourceProductId,
} from '@/data/resources';

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
  const { data, setData } = useResourcesCMS();
  const [newResource, setNewResource] = useState<ResourceFormState>({
    title: '',
    summary: '',
    kind: defaultKind,
    productId: defaultProduct,
    mediaType: 'upload',
    mediaUrl: '',
    mediaName: '',
    mediaMime: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateResourceField = (
    resourceId: string,
    field: keyof ResourceItem,
    value: string,
  ) => {
    setData((current) => ({
      ...current,
      resources: current.resources.map((resource) =>
        resource.id === resourceId ? { ...resource, [field]: value } : resource,
      ),
    }));
  };

  const handleNewResourceFile = async (file: File) => {
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setNewResource((current) => ({
        ...current,
        mediaType: 'upload',
        mediaUrl: dataUrl,
        mediaName: file.name,
        mediaMime: file.type,
      }));
    } catch (error) {
      return;
    }
  };

  const handleExistingResourceFile = async (resourceId: string, file: File) => {
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setData((current) => ({
        ...current,
        resources: current.resources.map((resource) =>
          resource.id === resourceId
            ? {
                ...resource,
                mediaType: 'upload',
                mediaUrl: dataUrl,
                mediaName: file.name,
                mediaMime: file.type,
              }
            : resource,
        ),
      }));
    } catch (error) {
      return;
    }
  };

  const updateResourceMediaType = (resourceId: string, mediaType: ResourceMediaType) => {
    setData((current) => ({
      ...current,
      resources: current.resources.map((resource) =>
        resource.id === resourceId
          ? {
              ...resource,
              mediaType,
              mediaUrl: '',
              mediaName: '',
              mediaMime: '',
            }
          : resource,
      ),
    }));
  };

  const removeResource = (resourceId: string) => {
    setData((current) => ({
      ...current,
      resources: current.resources.filter((resource) => resource.id !== resourceId),
    }));
  };

  const addResource = () => {
    const trimmedTitle = newResource.title.trim();
    const trimmedUrl = newResource.mediaUrl.trim();
    if (!trimmedTitle || !trimmedUrl) {
      return;
    }
    const resourceToAdd: ResourceItem = {
      id: createId('resource'),
      title: trimmedTitle,
      summary: newResource.summary.trim(),
      kind: newResource.kind,
      productId: newResource.productId,
      mediaType: newResource.mediaType,
      mediaUrl: trimmedUrl,
      mediaName: newResource.mediaName.trim(),
      mediaMime: newResource.mediaMime.trim(),
    };
    setData((current) => ({
      ...current,
      resources: [...current.resources, resourceToAdd],
    }));
    setNewResource((current) => ({
      ...current,
      title: '',
      summary: '',
      mediaUrl: '',
      mediaName: '',
      mediaMime: '',
    }));
  };

  const updateFaqField = (field: 'title', value: string) => {
    setData((current) => ({
      ...current,
      faq: {
        ...current.faq,
        [field]: value,
      },
    }));
  };

  const addFaqItem = () => {
    setData((current) => ({
      ...current,
      faq: {
        ...current.faq,
        items: [
          ...current.faq.items,
          {
            id: createId('faq'),
            question: 'New question',
            answer: 'New answer',
          },
        ],
      },
    }));
  };

  const updateFaqItem = (itemId: string, field: 'question' | 'answer', value: string) => {
    setData((current) => ({
      ...current,
      faq: {
        ...current.faq,
        items: current.faq.items.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
      },
    }));
  };

  const removeFaqItem = (itemId: string) => {
    setData((current) => ({
      ...current,
      faq: {
        ...current.faq,
        items: current.faq.items.filter((item) => item.id !== itemId),
      },
    }));
  };

  const selectedKindConfig =
    RESOURCE_KIND_CONFIG.find((kind) => kind.id === newResource.kind) || RESOURCE_KIND_CONFIG[0];

  const isAddDisabled =
    !newResource.title.trim() ||
    !newResource.mediaUrl.trim() ||
    (newResource.mediaType === 'upload' && !newResource.mediaName.trim());

  return (
    <Layout>
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Resources CMS</h1>
            <p className="text-muted-foreground">
              Update the Resources page content. Changes save automatically to this browser&apos;s storage.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Add and manage resources for each section.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="rounded-lg border border-border/60 p-5 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Add resource</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a resource kind and product, then fill in the details.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Resource kind</Label>
                    <Select
                      value={newResource.kind}
                      onValueChange={(value) =>
                        setNewResource((current) => ({ ...current, kind: value as ResourceKind }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {RESOURCE_KIND_CONFIG.map((kind) => (
                          <SelectItem key={kind.id} value={kind.id}>
                            {kind.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Product</Label>
                    <Select
                      value={newResource.productId}
                      onValueChange={(value) =>
                        setNewResource((current) => ({ ...current, productId: value as ResourceProductId }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {RESOURCE_PRODUCT_OPTIONS.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-resource-title">Title</Label>
                    <Input
                      id="new-resource-title"
                      value={newResource.title}
                      onChange={(event) =>
                        setNewResource((current) => ({ ...current, title: event.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-resource-summary">{selectedKindConfig.summaryLabel}</Label>
                    <Textarea
                      id="new-resource-summary"
                      value={newResource.summary}
                      onChange={(event) =>
                        setNewResource((current) => ({ ...current, summary: event.target.value }))
                      }
                      rows={2}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Resource source</Label>
                    <Select
                      value={newResource.mediaType}
                      onValueChange={(value) =>
                        setNewResource((current) => ({
                          ...current,
                          mediaType: value as ResourceMediaType,
                          mediaUrl: '',
                          mediaName: '',
                          mediaMime: '',
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upload">Upload file</SelectItem>
                        <SelectItem value="link">External link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    {newResource.mediaType === 'link' ? (
                      <>
                        <Label htmlFor="new-resource-link">Resource link</Label>
                        <Input
                          id="new-resource-link"
                          value={newResource.mediaUrl}
                          onChange={(event) =>
                            setNewResource((current) => ({ ...current, mediaUrl: event.target.value }))
                          }
                          placeholder="https://"
                        />
                      </>
                    ) : (
                      <>
                        <Label htmlFor="new-resource-file">Upload file</Label>
                        <Input
                          id="new-resource-file"
                          type="file"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              void handleNewResourceFile(file);
                            }
                          }}
                        />
                        {newResource.mediaName ? (
                          <p className="text-xs text-muted-foreground">Selected: {newResource.mediaName}</p>
                        ) : null}
                      </>
                    )}
                  </div>
                </div>
                <Button onClick={addResource} disabled={isAddDisabled}>
                  Add resource
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Manage resources</h3>
                  <p className="text-sm text-muted-foreground">
                    Edit or remove existing resources.
                  </p>
                </div>
                {data.resources.length ? (
                  <div className="space-y-4">
                    {data.resources.map((resource) => {
                      const resourceKind =
                        RESOURCE_KIND_CONFIG.find((kind) => kind.id === resource.kind) || RESOURCE_KIND_CONFIG[0];
                      return (
                        <div key={resource.id} className="rounded-lg border border-border/60 p-4 space-y-3">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Resource kind</Label>
                              <Select
                                value={resource.kind}
                                onValueChange={(value) => updateResourceField(resource.id, 'kind', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {RESOURCE_KIND_CONFIG.map((kind) => (
                                    <SelectItem key={kind.id} value={kind.id}>
                                      {kind.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Product</Label>
                              <Select
                                value={resource.productId}
                                onValueChange={(value) => updateResourceField(resource.id, 'productId', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {RESOURCE_PRODUCT_OPTIONS.map((product) => (
                                    <SelectItem key={product.id} value={product.id}>
                                      {product.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`resource-title-${resource.id}`}>Title</Label>
                              <Input
                                id={`resource-title-${resource.id}`}
                                value={resource.title}
                                onChange={(event) => updateResourceField(resource.id, 'title', event.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`resource-summary-${resource.id}`}>{resourceKind.summaryLabel}</Label>
                              <Textarea
                                id={`resource-summary-${resource.id}`}
                                value={resource.summary}
                                onChange={(event) => updateResourceField(resource.id, 'summary', event.target.value)}
                                rows={2}
                              />
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Resource source</Label>
                              <Select
                                value={resource.mediaType}
                                onValueChange={(value) =>
                                  updateResourceMediaType(resource.id, value as ResourceMediaType)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="upload">Upload file</SelectItem>
                                  <SelectItem value="link">External link</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              {resource.mediaType === 'link' ? (
                                <>
                                  <Label htmlFor={`resource-link-${resource.id}`}>Resource link</Label>
                                  <Input
                                    id={`resource-link-${resource.id}`}
                                    value={resource.mediaUrl}
                                    onChange={(event) =>
                                      updateResourceField(resource.id, 'mediaUrl', event.target.value)
                                    }
                                    placeholder="https://"
                                  />
                                </>
                              ) : (
                                <>
                                  <Label htmlFor={`resource-file-${resource.id}`}>Upload file</Label>
                                  <Input
                                    id={`resource-file-${resource.id}`}
                                    type="file"
                                    onChange={(event) => {
                                      const file = event.target.files?.[0];
                                      if (file) {
                                        void handleExistingResourceFile(resource.id, file);
                                      }
                                    }}
                                  />
                                  {resource.mediaName ? (
                                    <p className="text-xs text-muted-foreground">Selected: {resource.mediaName}</p>
                                  ) : null}
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button variant="destructive" size="sm" onClick={() => removeResource(resource.id)}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No resources added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>Update the questions and answers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="faq-title">FAQ section title</Label>
                <Input
                  id="faq-title"
                  value={data.faq.title}
                  onChange={(event) => updateFaqField('title', event.target.value)}
                />
              </div>
              <div className="space-y-4">
                {data.faq.items.map((item) => (
                  <div key={item.id} className="rounded-lg border border-border/60 p-4 space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor={`faq-question-${item.id}`}>Question</Label>
                      <Input
                        id={`faq-question-${item.id}`}
                        value={item.question}
                        onChange={(event) => updateFaqItem(item.id, 'question', event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`faq-answer-${item.id}`}>Answer</Label>
                      <Textarea
                        id={`faq-answer-${item.id}`}
                        value={item.answer}
                        onChange={(event) => updateFaqItem(item.id, 'answer', event.target.value)}
                        rows={2}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button variant="destructive" size="sm" onClick={() => removeFaqItem(item.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="secondary" onClick={addFaqItem}>
                Add FAQ item
              </Button>
            </CardContent>
          </Card>

        </div>
      </section>
    </Layout>
  );
};

export default ResourcesAdmin;
