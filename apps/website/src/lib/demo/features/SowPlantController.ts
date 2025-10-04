import { type BaseRequest, LudiekController } from '@123ishatest/ludiek';
import type { Farming } from '$lib/demo/features/Farming';
import type { PlantId } from '$lib/demo/demo.svelte';

export interface SowSeedRequest extends BaseRequest {
  type: '/farming/sow-seed';
  plant: PlantId;
}

export class SowSeedController extends LudiekController<SowSeedRequest> {
  readonly type = '/farming/sow-seed';

  private readonly _farming: Farming;

  constructor(farming: Farming) {
    super();
    this._farming = farming;
  }

  resolve(request: SowSeedRequest): void {
    this._farming.sow(request.plant);
  }
}
