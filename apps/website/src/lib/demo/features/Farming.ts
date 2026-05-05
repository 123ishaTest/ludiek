import { type PlantDetail } from '$lib/demo/model/PlantDetail';
import { LudiekFeature } from '@123ishatest/ludiek';
import type { GlobalDependencies } from '$lib/demo/GlobalDependencies';

export class Farming extends LudiekFeature<GlobalDependencies> {
  readonly type = 'farming';
  protected _state = {};

  public sow(id: string): void {
    const plant = this.getPlant(id);
    this.engine.plugins.currency.gainCurrency({ id: '/currency/money', amount: plant.moneyReward });
    this.engine.plugins.statistic.incrementMapStatistic('/statistic/plants-planted', plant.id);
  }

  public getPlant(id: string): PlantDetail {
    return this.engine.contentManager.get(id, 'plant');
  }
}
