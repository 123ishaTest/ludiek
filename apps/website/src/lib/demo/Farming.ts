import { LudiekFeature } from '@123ishatest/ludiek';
import type { EnginePlugins, PlantDetail, PlantId } from '$lib/demo/demo';

export class Farming extends LudiekFeature<EnginePlugins> {
  public readonly name: string = 'farming';

  public readonly plants: PlantDetail[];

  constructor(plants: PlantDetail[]) {
    super();
    this.plants = plants;
  }

  public sow(id: PlantId): void {
    const plant = this.getPlant(id);
    setTimeout(() => {
      this._api.currency.gainCurrency({ id: '/currency/money', amount: plant.moneyReward });
      this._api.statistic.incrementMapStatistic('/statistic/plants-planted', plant.id);
    }, plant.growthTime);
  }

  public getPlant(id: PlantId): PlantDetail {
    return this.plants.find((plant) => plant.id === id) as PlantDetail;
  }
}
