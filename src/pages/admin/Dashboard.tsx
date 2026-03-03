import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, FolderOpen, HelpCircle, Image as ImageIcon, Plus, ArrowRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/layout/AdminLayout';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';
import { dbSelect } from '@/lib/db';

const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  sub?: string;
  color: string;
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { data, loading } = useResourcesCMS();
  const [imageCount, setImageCount] = useState(0);

  const fetchImageCount = useCallback(async () => {
    try {
      const rows = await dbSelect('site_images');
      setImageCount(rows.length);
    } catch {
      // table may not exist yet
    }
  }, []);

  useEffect(() => { fetchImageCount(); }, [fetchImageCount]);

  const publishedCount = data.news.filter(n => n.status !== 'draft').length;
  const draftCount = data.news.filter(n => n.status === 'draft').length;
  const recentNews = [...data.news].slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back. Here's what's happening with your content.</p>
        </div>

        {/* Stat cards */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}><CardContent className="pt-6"><div className="h-16 bg-muted rounded animate-pulse" /></CardContent></Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Newspaper}
              label="News Articles"
              value={data.news.length}
              sub={`${publishedCount} published · ${draftCount} draft`}
              color="bg-blue-500/10 text-blue-600"
            />
            <StatCard
              icon={FolderOpen}
              label="Resources"
              value={data.resources.length}
              color="bg-primary/10 text-primary"
            />
            <StatCard
              icon={HelpCircle}
              label="FAQ Items"
              value={data.faq.items.length}
              color="bg-amber-500/10 text-amber-600"
            />
            <StatCard
              icon={ImageIcon}
              label="Site Images"
              value={imageCount}
              color="bg-purple-500/10 text-purple-600"
            />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent News */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base">Recent News</CardTitle>
                  <CardDescription>Latest 5 articles</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/news">View all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
                </Button>
              </CardHeader>
              <CardContent>
                {recentNews.length ? (
                  <div className="space-y-3">
                    {recentNews.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="h-10 w-14 rounded object-cover shrink-0" />
                        ) : (
                          <div className="h-10 w-14 rounded bg-muted shrink-0 flex items-center justify-center">
                            <Newspaper className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{item.category}</span>
                            <span className="text-[11px] text-muted-foreground">{item.date}</span>
                            {item.status === 'draft' && (
                              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-medium">Draft</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">No news articles yet.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
                <CardDescription>Jump to common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/admin/news">
                    <Plus className="mr-2 h-4 w-4" /> Add News Article
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/admin/resources">
                    <Plus className="mr-2 h-4 w-4" /> Add Resource
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/admin/content">
                    <TrendingUp className="mr-2 h-4 w-4" /> Edit Page Text
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/admin/media">
                    <ImageIcon className="mr-2 h-4 w-4" /> Manage Media
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
