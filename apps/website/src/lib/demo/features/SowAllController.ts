import type { BaseRequestShape, LudiekController } from '@123ishatest/ludiek';
import type { PlantId } from '$lib/demo/demo.svelte';
import type { Farming } from '$lib/demo/features/Farming.svelte';

export interface SowAllRequest extends BaseRequestShape {
  type: '/farming/sow-all';
  plant: PlantId;
}

export class SowAllController implements LudiekController<SowAllRequest> {
  readonly type: string = '/farming/sow-all';

  private readonly _farming: Farming;

  constructor(farming: Farming) {
    this._farming = farming;
  }

  resolve(request: SowAllRequest): void {
    for (let i = 0; i < this._farming.FARM_PLOTS; i++) {
      this._farming.sow(i, request.plant);
    }
  }
}
