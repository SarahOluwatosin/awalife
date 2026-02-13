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

/**
 * Upload a file to a fixed path, overwriting any existing file (upsert).
 * Returns the public URL with a cache-busting query param.
 */
export const uploadAndReplace = async (
  bucket: string,
  path: string,
  file: File
): Promise<string> => {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });

  if (error) throw new Error('Failed to replace image. Please try again.');

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return `${data.publicUrl}?t=${Date.now()}`;
};
