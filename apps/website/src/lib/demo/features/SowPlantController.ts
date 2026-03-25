import z from 'zod';
import type { Farming } from '$lib/demo/features/Farming';
import { Ludiek } from '$lib/demo/game';

export const SowSeedRequestSchema = z.strictObject({
  type: z.literal('/farming/sow-seed'),
  plant: z.string(),
});

export type SowSeedRequest = z.infer<typeof SowSeedRequestSchema>;

export class SowSeedController extends Ludiek.Controller<SowSeedRequest> {
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
