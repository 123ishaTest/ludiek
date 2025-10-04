import { LudiekFeature } from '@123ishatest/ludiek';
import type { EnginePlugins, PlantId } from '$lib/demo/demo.svelte';

import type { PlantDetail } from '$lib/demo/model/PlantDetail';

export class Farming extends LudiekFeature<EnginePlugins> {
  readonly name = 'farming';
  protected _state = {};

  public readonly plants: PlantDetail[];

  constructor(plants: PlantDetail[]) {
    super();
    this.plants = plants;
  }

  public sow(id: PlantId): void {
    const plant = this.getPlant(id);
    this._plugins.currency.gainCurrency({ id: '/currency/money', amount: plant.moneyReward });
    this._plugins.statistic.incrementMapStatistic('/statistic/plants-planted', plant.id);
  }

  public getPlant(id: PlantId): PlantDetail {
    return this.plants.find((plant) => plant.id === id) as PlantDetail;
  }
}
