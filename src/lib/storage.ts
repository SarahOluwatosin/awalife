import { supabase } from '@/integrations/supabase/client';

/**
 * Upload a file to Supabase Storage and return the public URL.
 */
export const uploadToStorage = async (
  bucket: string,
  folder: string,
  file: File
): Promise<string> => {
  const fileExt = file.name.split('.').pop() || 'bin';
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { upsert: false });

  if (error) throw new Error('Failed to upload file. Please try again.');

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return data.publicUrl;
};
