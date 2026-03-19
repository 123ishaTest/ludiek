import z from 'zod';

export const SkillDetailSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  experiencePerLevel: z.array(z.number()),
  initialExperience: z.number().default(0),
});

export type SkillDetail = z.infer<typeof SkillDetailSchema>;
