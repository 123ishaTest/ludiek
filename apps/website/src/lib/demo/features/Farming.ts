import { CurrencyPlugin, LudiekFeature, StatisticPlugin } from '@123ishatest/ludiek';

import type { PlantDetail } from '$lib/demo/model/PlantDetail';

type Dependencies = {
  plugins: [CurrencyPlugin, StatisticPlugin];
};

export class Farming extends LudiekFeature<Dependencies> {
  readonly type = 'farming';
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
    this.engine.plugins.currency.gainCurrency({ id: '/currency/money', amount: plant.moneyReward });
    this.engine.plugins.statistic.incrementMapStatistic('/statistic/plants-planted', plant.id);
  }

  public getPlant(id: string): PlantDetail {
    return this.plants.find((plant) => plant.id === id) as PlantDetail;
  }
}
