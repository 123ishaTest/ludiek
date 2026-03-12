import z, { ZodType } from 'zod';

export const ContentSchema = z.object({
  id: z.string(),
});

export type Content = z.infer<typeof ContentSchema>;

export type ContentMapFromKinds<Kinds extends Record<string, ZodType<{ id: string }>>> = {
  [Kind in keyof Kinds]: Record<string, z.infer<Kinds[Kind]>>;
};

export type KindDefinitions = Record<string, ZodType<{ id: string }>>;
