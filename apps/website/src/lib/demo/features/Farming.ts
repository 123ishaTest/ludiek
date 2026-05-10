import { type PlantDetail, PlantSchema } from '$lib/demo/model/PlantDetail';
import { CurrencyPlugin, LudiekFeature, StatisticPlugin } from '@123ishatest/ludiek';

type Dependencies = {
  plugins: [CurrencyPlugin, StatisticPlugin];
  content: [{ kind: 'plant'; schema: typeof PlantSchema }];
};
export class Farming extends LudiekFeature<Dependencies> {
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
