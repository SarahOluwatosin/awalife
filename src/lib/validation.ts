import { z } from 'zod';

export const NewsItemSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be under 200 characters'),
  excerpt: z.string().trim().max(500, 'Excerpt must be under 500 characters'),
  content: z.string().trim().max(50000, 'Content must be under 50,000 characters'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  category: z.string().min(1).max(50),
  location: z.string().trim().max(100, 'Location must be under 100 characters'),
  imageUrl: z.string().max(2048, 'Image URL too long'),
});

export const ResourceItemSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be under 200 characters'),
  summary: z.string().trim().max(1000, 'Summary must be under 1,000 characters'),
  kind: z.string().min(1).max(50),
  productId: z.string().min(1).max(50),
  mediaType: z.enum(['upload', 'link']),
  mediaUrl: z.string().max(2048, 'Media URL too long'),
  mediaName: z.string().max(200, 'File name too long'),
  mediaMime: z.string().max(100, 'MIME type too long'),
});

export const FaqItemSchema = z.object({
  question: z.string().trim().min(1, 'Question is required').max(500, 'Question must be under 500 characters'),
  answer: z.string().trim().min(1, 'Answer is required').max(5000, 'Answer must be under 5,000 characters'),
});

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const ALLOWED_FILE_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const validateImageFile = (file: File): string | null => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Invalid image type. Allowed: JPG, PNG, WebP, GIF.';
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return `Image too large. Maximum size is ${MAX_IMAGE_SIZE / (1024 * 1024)}MB.`;
  }
  return null;
};

export const validateResourceFile = (file: File): string | null => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return 'Invalid file type.';
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`;
  }
  return null;
};
