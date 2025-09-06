import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { PluginMap } from '@ludiek/engine/LudiekEngineConfig';
import { EngineConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { ISignal, SignalDispatcher } from 'strongly-typed-events';
import { LudiekFeaturesSaveData, LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { LudiekLocalStorage } from '@ludiek/engine/peristence/LudiekLocalStorage';
import { LudiekJsonSaveEncoder } from '@ludiek/engine/peristence/LudiekJsonSaveEncoder';
import { LudiekGameConfig } from '@ludiek/engine/LudiekGameConfig';
import { EngineInputShape, LudiekInput } from '@ludiek/engine/input/LudiekInput';
import { EngineOutputShape, LudiekOutput } from '@ludiek/engine/output/LudiekOutput';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';
import { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';

export type FeatureMap<Features extends LudiekFeature<Record<string, LudiekPlugin>>[]> = {
  [Feature in Features[number] as Feature['name']]: Extract<Features[number], { name: Feature['name'] }>;
};

export class LudiekGame<
  Plugins extends LudiekPlugin[],
  Conditions extends LudiekCondition[],
  Inputs extends LudiekInput[],
  Outputs extends LudiekOutput[],
  Controllers extends LudiekController[],
  Features extends LudiekFeature<PluginMap<Plugins>>[],
> {
  public readonly features: FeatureMap<Features>;
  public readonly engine: LudiekEngine<Plugins, Conditions, Inputs, Outputs, Controllers>;
  public readonly config: LudiekGameConfig<Plugins, Features>;
  protected saveEncoder = new LudiekJsonSaveEncoder();
  protected _tickInterval: NodeJS.Timeout | null = null;

  private _onTick = new SignalDispatcher();

  protected _nextSave: number;

  constructor(
    engine: LudiekEngine<Plugins, Conditions, Inputs, Outputs, Controllers>,
    config: LudiekGameConfig<Plugins, Features> & { features: Features },
  ) {
    this.engine = engine;
    this.features = Object.fromEntries(config.features?.map((f) => [f.name, f]) ?? []) as FeatureMap<Features>;

    this.config = config;

    this._nextSave = this.config.saveInterval;

    this.featureList.forEach((feature) => {
      feature.init(this.engine.plugins);

      feature.config.conditions?.forEach((c) => engine.registerCondition(c));
      feature.config.inputs?.forEach((i) => engine.registerInput(i));
      feature.config.outputs?.forEach((o) => engine.registerOutput(o));
      feature.config.controllers?.forEach((c) => engine.registerController(c));
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
    this.featureList.forEach((feature) => feature.update?.(delta));

    this._nextSave -= delta;
    if (this._nextSave <= 0) {
      const data = this.save();
      LudiekLocalStorage.store(this.config.saveKey, data, this.saveEncoder);

      this._nextSave = this.config.saveInterval;
    }

    // TODO(@Isha): Should ticks be in the history?
    // this.requestHistory.record({
    //   type: '/internal/tick'
    // })
    this._onTick.dispatch();
  }

  public request(request: Parameters<this['engine']['request']>[0]): void {
    return this.engine.request(request);
  }

  public evaluate(
    condition: EngineConditionShape<Plugins, Conditions> | EngineConditionShape<Plugins, Conditions>[],
  ): boolean {
    return this.engine.evaluate(condition);
  }

  public handleTransaction(
    transaction: LudiekTransaction<
      EngineInputShape<Plugins, Inputs>,
      EngineOutputShape<Plugins, Outputs>,
      EngineConditionShape<Plugins, Conditions>
    >,
  ): boolean {
    return this.engine.handleTransaction(transaction);
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
