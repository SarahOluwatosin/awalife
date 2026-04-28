import { useEffect, useState, useCallback } from 'react';
import { Mail, Trash2, RefreshCw } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dbSelectAuth, dbDelete } from '@/lib/db';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Submission {
  id: string;
  full_name: string;
  position: string;
  company: string;
  email: string;
  whatsapp: string;
  country: string;
  product_type: string | null;
  message: string;
  created_at: string;
}

const AdminContacts = () => {
  const { session } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);

  const load = useCallback(async () => {
    if (!session?.access_token) return;
    setLoading(true);
    try {
      const rows = await dbSelectAuth<Submission>('contact_submissions', session.access_token, 'order=created_at.desc');
      setSubmissions(rows);
    } catch {
      toast({ title: 'Failed to load submissions', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [session?.access_token]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string) => {
    if (!session?.access_token) return;
    try {
      await dbDelete('contact_submissions', id, session.access_token);
      setSubmissions(s => s.filter(r => r.id !== id));
      if (selected?.id === id) setSelected(null);
      toast({ title: 'Submission deleted' });
    } catch {
      toast({ title: 'Failed to delete', variant: 'destructive' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Contact Submissions</h1>
            <p className="text-sm text-muted-foreground mt-1">Messages submitted via the Contact Us form</p>
          </div>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">All Submissions ({submissions.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {submissions.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  {loading ? 'Loading...' : 'No submissions yet.'}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map(s => (
                      <TableRow
                        key={s.id}
                        className={`cursor-pointer ${selected?.id === s.id ? 'bg-primary/5' : 'hover:bg-muted/40'}`}
                        onClick={() => setSelected(s)}
                      >
                        <TableCell className="font-medium">{s.full_name}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{s.email}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{new Date(s.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost" size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={e => { e.stopPropagation(); handleDelete(s.id); }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Detail */}
          {selected ? (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{selected.full_name}</CardTitle>
                <CardDescription>{new Date(selected.created_at).toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-muted-foreground">Position</span><p className="font-medium mt-0.5">{selected.position || '—'}</p></div>
                  <div><span className="text-muted-foreground">Company</span><p className="font-medium mt-0.5">{selected.company || '—'}</p></div>
                  <div><span className="text-muted-foreground">Country</span><p className="font-medium mt-0.5">{selected.country || '—'}</p></div>
                  <div><span className="text-muted-foreground">WhatsApp</span><p className="font-medium mt-0.5">{selected.whatsapp || '—'}</p></div>
                  <div className="col-span-2"><span className="text-muted-foreground">Product Type of Interest</span><p className="font-medium mt-0.5">{selected.product_type || '—'}</p></div>
                </div>
                <div>
                  <span className="text-muted-foreground">Email</span>
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-1.5 text-primary mt-0.5 hover:underline">
                    <Mail className="h-3.5 w-3.5" />{selected.email}
                  </a>
                </div>
                <div>
                  <span className="text-muted-foreground">Message</span>
                  <p className="mt-1 leading-relaxed whitespace-pre-wrap bg-muted/30 rounded-lg p-3">{selected.message || '—'}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" asChild>
                    <a href={`mailto:${selected.email}`}>Reply via Email</a>
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(selected.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center min-h-[200px]">
              <p className="text-muted-foreground text-sm">Select a submission to view details</p>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContacts;
