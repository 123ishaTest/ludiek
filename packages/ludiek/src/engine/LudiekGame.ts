import { EngineTypes, LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { LudiekEngineConfig, PluginMap } from '@ludiek/engine/LudiekEngineConfig';
import { ISignal, SignalDispatcher } from 'strongly-typed-events';
import { LudiekFeaturesSaveData, LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { LudiekLocalStorage } from '@ludiek/engine/peristence/LudiekLocalStorage';
import { LudiekJsonSaveEncoder } from '@ludiek/engine/peristence/LudiekJsonSaveEncoder';
import { LudiekGameConfig } from '@ludiek/engine/LudiekGameConfig';

export type FeatureMap<Features extends LudiekFeature<Record<string, LudiekPlugin>>[]> = {
  [Feature in Features[number] as Feature['type']]: Extract<Features[number], { type: Feature['type'] }>;
};

// TODO(@Isha): Fix
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class LudiekGame<EngineConfig extends LudiekEngineConfig, Features extends LudiekFeature<any>[]> {
  public readonly features: FeatureMap<Features>;
  private readonly _engine: LudiekEngine<EngineConfig>;
  public readonly config: LudiekGameConfig<LudiekPlugin[], Features>;
  protected saveEncoder = new LudiekJsonSaveEncoder();
  protected _tickInterval: ReturnType<typeof setTimeout> | null = null;

  private _onTick = new SignalDispatcher();

  protected _nextSave: number;

  constructor(engine: LudiekEngine<EngineConfig>, config: LudiekGameConfig<LudiekPlugin<EngineConfig>[], Features>) {
    this._engine = engine;
    // TODO(@Isha): What to do with features?
    this.features = Object.fromEntries(config.features?.map((f) => [f.type, f]) ?? []) as FeatureMap<Features>;
    this.config = config;

    this._nextSave = this.config.saveInterval;

    this.featureList.forEach((feature) => {
      feature.inject(this._engine);
    });
  }

  public start(): void {
    // TODO(@Isha): Improve game loop
    this.stop();
    this._tickInterval = setInterval(() => {
      this.tick(this.config.tickDuration);
    }, this.config.tickDuration * 1000);
  }

  // TODO(@Isha): Improve state management
  public stop(): void {
    if (this._tickInterval) {
      clearInterval(this._tickInterval);
    }
  }

  public tick(delta: number): void {
    this._engine.preTick();
    this.featureList.forEach((feature) => feature.update?.(delta));

    this._nextSave -= delta;
    if (this._nextSave <= 0) {
      const data = this.save();
      LudiekLocalStorage.store(this.config.saveKey, data, this.saveEncoder);

      this._nextSave = this.config.saveInterval;
    }

    this._onTick.dispatch();
  }

  public save(): LudiekSaveData {
    const featureData: LudiekFeaturesSaveData = {};
    this.featureList.forEach((feature) => {
      featureData[feature.type] = feature.save();
    });

    return {
      engine: this._engine.save(),
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
      const featureSaveData = saveData.features[feature.type];
      if (featureSaveData == null) {
        return;
      }
      feature.load(featureSaveData);
    });
    this._engine.load(saveData.engine);
  }

  public get featureList(): LudiekFeature<PluginMap<EngineTypes<EngineConfig>['Plugins']>>[] {
    return Object.values(this.features);
  }

  public get engine(): LudiekEngine<EngineConfig> {
    return this._engine;
  }

  /**
   * Emitted when a tick happens
   */
  public get onTick(): ISignal {
    return this._onTick.asEvent();
  }
}
