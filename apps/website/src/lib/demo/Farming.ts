import { LudiekFeature } from '@123ishatest/ludiek';
import type { EngineAPI, PlantDetail, PlantId } from '$lib/demo/demo';

export class Farming extends LudiekFeature<EngineAPI> {
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
    }, plant.growthTime);
  }

  public getPlant(id: PlantId): PlantDetail {
    return this.plants.find((plant) => plant.id === id) as PlantDetail;
  }
}
