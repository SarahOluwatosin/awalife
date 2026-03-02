import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Pencil, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { usePageContent } from '@/contexts/PageContentContext';

const PAGE_LABELS: Record<string, string> = {
  home: 'Home',
  about: 'About',
  contact: 'Contact',
  resources: 'Resources',
  news: 'News',
  products: 'Products',
  footer: 'Footer',
};

const PageContentManager = () => {
  const { rows, loading, updateContent } = usePageContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);

  const grouped = rows.reduce<Record<string, typeof rows>>((acc, row) => {
    if (!acc[row.page]) acc[row.page] = [];
    acc[row.page].push(row);
    return acc;
  }, {});

  const startEdit = (id: string, currentValue: string) => {
    setEditingId(id);
    setEditValue(currentValue);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const saveEdit = async (id: string) => {
    setSaving(true);
    try {
      await updateContent(id, editValue);
      toast({ title: 'Content updated' });
      setEditingId(null);
      setEditValue('');
    } catch {
      toast({ title: 'Failed to update content', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-muted-foreground text-center py-12">Loading page content...</p>;
  }

  const pages = Object.keys(grouped).sort((a, b) => {
    const order = ['home', 'about', 'contact', 'resources', 'news', 'products', 'footer'];
    return (order.indexOf(a) ?? 99) - (order.indexOf(b) ?? 99);
  });

  if (!pages.length) {
    return (
      <div className="rounded-xl border border-dashed border-border/40 bg-secondary/5 py-16 text-center">
        <p className="text-muted-foreground font-medium mb-2">No page content found</p>
        <p className="text-sm text-muted-foreground">
          The <code className="bg-muted px-1 py-0.5 rounded text-xs">page_content</code> table hasn't been created yet.
          Run the Supabase migration first, then refresh this page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pages.map(page => (
        <Card key={page}>
          <CardHeader>
            <CardTitle className="capitalize">{PAGE_LABELS[page] ?? page} Page</CardTitle>
            <CardDescription>Editable text content for the {PAGE_LABELS[page] ?? page} page sections.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {grouped[page].map(row => {
                const isEditing = editingId === row.id;
                const isLong = row.value.length > 80 || row.type === 'richtext';
                return (
                  <div key={row.id} className="rounded-lg border border-border/30 p-4 bg-card/30">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <Label className="text-sm font-semibold">{row.label}</Label>
                        <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{row.page}/{row.section}/{row.key}</p>
                      </div>
                      {!isEditing && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => startEdit(row.id, row.value)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-2">
                        {isLong ? (
                          <Textarea
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            rows={4}
                            className="text-sm"
                            autoFocus
                          />
                        ) : (
                          <Input
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            className="text-sm"
                            autoFocus
                          />
                        )}
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => saveEdit(row.id)} disabled={saving}>
                            <Check className="mr-1.5 h-3.5 w-3.5" /> Save
                          </Button>
                          <Button variant="ghost" size="sm" onClick={cancelEdit} disabled={saving}>
                            <X className="mr-1.5 h-3.5 w-3.5" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                        {row.value || <span className="text-muted-foreground italic">No value set</span>}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PageContentManager;
