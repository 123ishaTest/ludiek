import z from 'zod';
import { Ludiek } from '$lib/demo/ludiek';

export const SowSeedRequestSchema = z.strictObject({
  type: z.literal('/farming/sow-seed'),
  plant: z.string(),
});

export type SowSeedRequest = z.infer<typeof SowSeedRequestSchema>;

export class SowSeedController extends Ludiek.controller<SowSeedRequest>() {
  readonly schema = SowSeedRequestSchema;

  resolve(request: SowSeedRequest): void {
    this.engine.features.farming.sow(request.plant);
  }
}
