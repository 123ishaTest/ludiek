import type { BaseRequestShape, LudiekController } from '@123ishatest/ludiek';
import type { Farming } from '$lib/demo/features/Farming.svelte';
import type { PlantId } from '$lib/demo/content';

export interface PlantAllRequest extends BaseRequestShape {
  type: 'plant-all'
  plant: PlantId;
}

export class PlantAllController implements LudiekController<PlantAllRequest> {
  type: string = 'plant-all';

  private readonly _farming: Farming;
  constructor(farming: Farming) {
    this._farming = farming;
  }

  resolve(request: PlantAllRequest): void {
    this._farming.plantAll(request.plant);
  }
}