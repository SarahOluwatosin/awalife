import AdminLayout from '@/components/layout/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SiteImagesManager from '@/components/admin/SiteImagesManager';
import SiteVideosManager from '@/components/admin/SiteVideosManager';
import CarouselImagesManager from '@/components/admin/CarouselImagesManager';

const AdminMedia = () => (
  <AdminLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Media</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage site images, videos, and carousel content.</p>
      </div>

      <Tabs defaultValue="images" className="w-full">
        <TabsList>
          <TabsTrigger value="images">Site Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="carousel">Carousel</TabsTrigger>
        </TabsList>
        <TabsContent value="images" className="mt-6">
          <SiteImagesManager />
        </TabsContent>
        <TabsContent value="videos" className="mt-6">
          <SiteVideosManager />
        </TabsContent>
        <TabsContent value="carousel" className="mt-6">
          <CarouselImagesManager />
        </TabsContent>
      </Tabs>
    </div>
  </AdminLayout>
);

export default AdminMedia;
