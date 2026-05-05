import z from 'zod';
import { LudiekController } from '@123ishatest/ludiek';
import type { GlobalDependencies } from '$lib/demo/GlobalDependencies';

export const SowSeedRequestSchema = z.strictObject({
  type: z.literal('/farming/sow-seed'),
  plant: z.string(),
});

export type SowSeedRequest = z.infer<typeof SowSeedRequestSchema>;

export class SowSeedController extends LudiekController<SowSeedRequest, GlobalDependencies> {
  readonly schema = SowSeedRequestSchema;

  resolve(request: SowSeedRequest): void {
    this.engine.features.farming.sow(request.plant);
  }
}
