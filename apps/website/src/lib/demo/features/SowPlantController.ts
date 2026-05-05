import z from 'zod';
import { LudiekController } from '@123ishatest/ludiek';
import type { Farming } from '$lib/demo/features/Farming';

export const SowSeedRequestSchema = z.strictObject({
  type: z.literal('/farming/sow-seed'),
  plant: z.string(),
});

export type SowSeedRequest = z.infer<typeof SowSeedRequestSchema>;

type Dependencies = {
  features: [Farming];
};

export class SowSeedController extends LudiekController<SowSeedRequest, Dependencies> {
  readonly schema = SowSeedRequestSchema;

  resolve(request: SowSeedRequest): void {
    this.engine.features.farming.sow(request.plant);
  }
}
