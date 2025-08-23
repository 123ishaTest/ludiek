import type { BaseRequestShape, LudiekController } from '@123ishatest/ludiek';
import type { Farming } from '$lib/demo/features/Farming.svelte';

export interface HarvestAllRequest extends BaseRequestShape {
  type: 'harvest-all'
}

export class HarvestAllController implements LudiekController<HarvestAllRequest> {
  type: string = 'harvest-all';

  private readonly _farming: Farming;
  constructor(farming: Farming) {
    this._farming = farming;
  }

  resolve(request: HarvestAllRequest): void {
    this._farming.harvestAll();
  }
}