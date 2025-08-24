import type { BaseRequestShape, LudiekController } from '@123ishatest/ludiek';
import type { Farming } from '$lib/demo/features/Farming';
import type { PlantId } from '$lib/demo/demo.svelte';

export interface SowSeedRequest extends BaseRequestShape {
  type: '/farming/sow-seed';
  plant: PlantId;
}

export class SowSeedController implements LudiekController<SowSeedRequest> {
  type: string = '/farming/sow-seed';

  private readonly _farming: Farming;

  constructor(farming: Farming) {
    this._farming = farming;
  }

  resolve(request: SowSeedRequest): void {
    this._farming.sow(request.plant);
  }
}
