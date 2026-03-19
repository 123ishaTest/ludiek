import z from 'zod';
import { LudiekController } from '@123ishatest/ludiek';
import type { Farming } from '$lib/demo/features/Farming';

export const SowSeedRequestSchema = z.strictObject({
  type: z.literal('/farming/sow-seed'),
  plant: z.string(),
});

export type SowSeedRequest = z.infer<typeof SowSeedRequestSchema>;

export class SowSeedController extends LudiekController<SowSeedRequest> {
  readonly schema = SowSeedRequestSchema;

  private readonly _farming: Farming;

  constructor(farming: Farming) {
    super();
    this._farming = farming;
  }

  resolve(request: SowSeedRequest): void {
    this._farming.sow(request.plant);
  }
}
