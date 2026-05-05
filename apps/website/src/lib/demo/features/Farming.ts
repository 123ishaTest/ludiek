import type { PlantDetail } from '$lib/demo/model/PlantDetail';
import { Ludiek } from '$lib/demo/ludiek';

export class Farming extends Ludiek.feature() {
  readonly type = 'farming';
  protected _state = {};

  public plants: PlantDetail[] = [];

  constructor() {
    super();
  }

  public sow(id: string): void {
    const plant = this.getPlant(id);
    this.engine.plugins.currency.gainCurrency({ id: '/currency/money', amount: plant.moneyReward });
    this.engine.plugins.statistic.incrementMapStatistic('/statistic/plants-planted', plant.id);
  }

  public getPlant(id: string): PlantDetail {
    return this.engine.contentManager.get(id, 'plant');
  }
}
