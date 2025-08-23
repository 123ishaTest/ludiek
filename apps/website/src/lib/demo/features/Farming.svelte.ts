import { LudiekFeature } from '@123ishatest/ludiek';
import type { EnginePlugins } from '$lib/demo/demo.svelte';

import type { PlantDetail } from '$lib/demo/model/PlantDetail';
import { emptyPlot, type FarmingState, type FarmPlotState } from '$lib/demo/features/FarmingState';
import { getPlant, type PlantId } from '$lib/demo/content';
import { HarvestAllController } from '$lib/demo/features/HarvestAllController';
import { PlantAllController } from '$lib/demo/features/PlantAllController';

export class Farming extends LudiekFeature<EnginePlugins> {
  public readonly name: string = 'farming';
  public readonly FARM_PLOTS = 25;

  public readonly controllers = [
    new PlantAllController(this),
    new HarvestAllController(this),
  ]

  protected _state: FarmingState = $state({
    plots: [],
  });

  public readonly plants: PlantDetail[];

  constructor(plants: PlantDetail[]) {
    super();
    this.plants = plants;

    for (let i = 0; i < this.FARM_PLOTS; i++) {
      this._state.plots.push(emptyPlot());
    }
  }

  update(delta: number) {
    this.growAllPlants(delta);
  }

  public growAllPlants(amount: number): void {
    this._state.plots.forEach((plot) => {
      if (!plot.plant) {
        return;
      }
      plot.progress += amount;
    });
  }

  public sow(index: number, id: PlantId): void {
    if (!this.isEmpty(index)) {
      return;
    }
    const plant = getPlant(id);
    if (
      !this._plugins.currency.payCurrency({
        id: plant.id,
        amount: 1,
      })
    ) {
      return;
    }

    this._plugins.statistic.incrementMapStatistic('/statistic/plants-planted', id);
    this._state.plots[index] = {
      plant: id,
      progress: 0,
    };
  }

  public reap(index: number): void {
    console.log(index)
    if (!this.isReady(index)) {
      return;
    }
    const plot = this.getPlot(index);
    const plant = getPlant(plot.plant as PlantId);

    this._plugins.currency.gainCurrency({ id: '/currency/money', amount: plant.moneyReward });
    this.clear(index);
  }

  public getGrowthStage(index: number): string {
    if (this.isEmpty(index)) {
      return '';
    }
    const progress = this.getProgress(index);
    const plot = this.getPlot(index);
    const plant = getPlant(plot.plant as PlantId);

    const stage = Math.floor(progress * (plant.stages.length - 1));
    return plant.stages[stage];
  }

  public getProgress(index: number): number {
    if (this.isEmpty(index)) {
      return 0;
    }
    const plot = this.getPlot(index);
    const plant = getPlant(plot.plant as PlantId);
    return Math.min(1, plot.progress / plant.growthTime);
  }

  public clear(index: number): void {
    this._state.plots[index] = emptyPlot();
  }

  public getPlant(id: PlantId): PlantDetail {
    return this.plants.find((plant) => plant.id === id) as PlantDetail;
  }

  public isEmpty(index: number): boolean {
    return this.getPlot(index).plant == null;
  }

  public isReady(index: number): boolean {
    const plot = this.getPlot(index);
    if (!plot.plant) {
      return false;
    }

    const plant = getPlant(plot.plant);
    return plot.progress >= plant.growthTime;
  }

  public getPlot(index: number): FarmPlotState {
    return this._state.plots[index];
  }

  public get plots(): FarmPlotState[] {
    return this._state.plots;
  }

  /**
   * Harvest all plots
   */
  public harvestAll(): void {
    for (let i = 0; i < this.FARM_PLOTS; i++) {
      this.reap(i);
    }
  }

  /**
   * Plant all plots
   */
  plantAll(plant: PlantId) {
    for (let i = 0; i < this.FARM_PLOTS; i++) {
      this.sow(i, plant);
    }
  }
}
