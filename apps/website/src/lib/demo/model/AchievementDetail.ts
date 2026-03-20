import z from 'zod';
import { engine } from '$lib/demo/demo.svelte';

export const AchievementSchema = z.strictObject({
  id: z.string(),
  condition: z.optional(engine.conditionSchema()),
});

export type AchievementDetail = z.infer<typeof AchievementSchema>;
