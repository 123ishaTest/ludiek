import z from 'zod';

export const ContentSchema = z.object({
  id: z.string(),
});

export type Content = z.infer<typeof ContentSchema>;
