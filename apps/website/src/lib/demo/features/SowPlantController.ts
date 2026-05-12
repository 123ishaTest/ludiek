import z from 'zod';
import { LudiekController } from '@123ishatest/ludiek';
import type { Farming } from '$lib/demo/features/Farming';

export const SowSeedRequestSchema = z.strictObject({
  type: z.literal('/request/farming/sow-seed'),
  plant: z.string(),
});

export type SowSeedRequest = z.infer<typeof SowSeedRequestSchema>;
export type SowSeedResponse = {
  plant: string;
};

type Dependencies = {
  features: [Farming];
};
export class SowSeedController extends LudiekController<SowSeedRequest, SowSeedResponse, Dependencies> {
  readonly schema = SowSeedRequestSchema;

  resolve(request: SowSeedRequest) {
    this.engine.features.farming.sow(request.plant);
    return this.success({
      plant: request.plant,
    });
  }
}
