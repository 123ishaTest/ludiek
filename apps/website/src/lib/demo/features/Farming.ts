import type { PlantDetail } from '$lib/demo/model/PlantDetail';
import { Ludiek } from '$lib/demo/game';

export class Farming extends Ludiek.Feature {
  readonly name = 'farming';
  protected _state = {};

  public plants: PlantDetail[] = [];

  constructor() {
    super();
  }

  public loadContent(plants: PlantDetail[]): void {
    this.plants = plants;
  }

  public sow(id: string): void {
    const plant = this.getPlant(id);
    this._plugins.currency.gainCurrency({ id: '/currency/money', amount: plant.moneyReward });
    this._plugins.statistic.incrementMapStatistic('/statistic/plants-planted', plant.id);
  }

  public getPlant(id: string): PlantDetail {
    return this.plants.find((plant) => plant.id === id) as PlantDetail;
  }
}
