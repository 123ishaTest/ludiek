import { z } from 'zod';
import { engine } from '$lib/demo/demo.svelte';

export const CouponDetailSchema = z.strictObject({
  id: z.string(),
  hash: z.string(),
  condition: engine.conditionSchema().optional(),
  output: engine.outputSchema(),
});

export type CouponDetail = z.infer<typeof CouponDetailSchema>;
