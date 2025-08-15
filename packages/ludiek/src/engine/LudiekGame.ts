import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { PluginMap } from '@ludiek/engine/LudiekConfiguration';
import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { ISignal, SignalDispatcher } from 'strongly-typed-events';
import { LudiekFeaturesSaveData, LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { LudiekLocalStorage } from '@ludiek/engine/peristence/LudiekLocalStorage';
import { LudiekJsonSaveEncoder } from '@ludiek/engine/peristence/LudiekJsonSaveEncoder';

export interface LudiekGameConfig {
  saveKey: string;
}

export class LudiekGame<
  Plugins extends LudiekPlugin[],
  Conditions extends LudiekCondition<BaseConditionShape>[],
  Features extends Record<string, LudiekFeature<PluginMap<Plugins>>>,
> {
  public features: Features;
  public engine: LudiekEngine<Plugins, Conditions>;
  public config: LudiekGameConfig;
  protected saveEncoder = new LudiekJsonSaveEncoder();
  protected _tickInterval: NodeJS.Timeout | null = null;

  private _onTick = new SignalDispatcher();

  protected readonly SAVE_INTERVAL: number = 3;
  protected _nextSave: number = this.SAVE_INTERVAL;

  constructor(engine: LudiekEngine<Plugins, Conditions>, features: Features, config: LudiekGameConfig) {
    this.engine = engine;
    this.features = features;
    this.config = config;

    this.featureList.forEach((feature) => {
      feature.init(this.engine.plugins);
    });
  }

  public start(): void {
    // TODO(@Isha): Improve game loop
    this.stop();
    this._tickInterval = setInterval(() => {
      this.tick(1);
    }, 1000);
  }

  // TODO(@Isha): Improve state management
  public stop(): void {
    if (this._tickInterval) {
      clearInterval(this._tickInterval);
    }
  }

  public tick(delta: number): void {
    this.featureList.forEach((feature) => feature.update?.(delta));

    this._nextSave -= delta;
    if (this._nextSave <= 0) {
      const data = this.save();
      LudiekLocalStorage.store(this.config.saveKey, data, this.saveEncoder);

      this._nextSave = this.SAVE_INTERVAL;
    }
    this._onTick.dispatch();
  }

  public save(): LudiekSaveData {
    const featureData: LudiekFeaturesSaveData = {};
    this.featureList.forEach((feature) => {
      featureData[feature.name] = feature.save();
    });

    return {
      engine: this.engine.save(),
      features: featureData,
    };
  }

  public loadFromStorage(): void {
    const data = LudiekLocalStorage.get(this.config.saveKey, this.saveEncoder);
    this.load(data);
  }

  public load(saveData: LudiekSaveData): void {
    if (saveData == null) {
      return;
    }
    this.featureList.forEach((feature) => {
      const featureSaveData = saveData.features[feature.name];
      if (featureSaveData == null) {
        return;
      }
      feature.load(featureSaveData);
    });
    this.engine.load(saveData.engine);
  }

  public get featureList(): LudiekFeature<PluginMap<Plugins>>[] {
    return Object.values(this.features);
  }

  /**
   * Emitted when a tick happens
   */
  public get onTick(): ISignal {
    return this._onTick.asEvent();
  }
}
