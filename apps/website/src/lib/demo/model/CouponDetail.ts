import { z } from 'zod';
import { l } from '@123ishatest/ludiek';

export const CouponDetailSchema = z.strictObject({
  id: z.string(),
  hash: z.string(),
  condition: z.optional(l.condition()),
  output: l.output(),
});

export type CouponDetail = z.infer<typeof CouponDetailSchema>;
