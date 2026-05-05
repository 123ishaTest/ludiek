import { l } from '@123ishatest/ludiek';
import z from 'zod';

export const AchievementSchema = z.strictObject({
  id: z.string(),
  condition: z.optional(l.condition()),
});

export type AchievementDetail = z.infer<typeof AchievementSchema>;
