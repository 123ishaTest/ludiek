import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { PluginMap } from '@ludiek/engine/LudiekEngineConfig';
import { LudiekCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { ISignal, SignalDispatcher } from 'strongly-typed-events';
import { LudiekFeaturesSaveData, LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { LudiekLocalStorage } from '@ludiek/engine/peristence/LudiekLocalStorage';
import { LudiekJsonSaveEncoder } from '@ludiek/engine/peristence/LudiekJsonSaveEncoder';
import { LudiekGameConfig } from '@ludiek/engine/LudiekGameConfig';
import { LudiekConsumer, LudiekInput } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LudiekController, LudiekRequest } from '@ludiek/engine/request/LudiekRequest';
import { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';

export type FeatureMap<Features extends LudiekFeature<Record<string, LudiekPlugin>>[]> = {
  [Feature in Features[number] as Feature['name']]: Extract<Features[number], { name: Feature['name'] }>;
};

export class LudiekGame<
  Plugins extends LudiekPlugin[],
  Features extends LudiekFeature<PluginMap<Plugins>>[],
  Evaluators extends readonly LudiekEvaluator[],
  Consumers extends readonly LudiekConsumer[],
  Producers extends readonly LudiekProducer[],
  Controllers extends readonly LudiekController[],
> {
  public readonly features: FeatureMap<Features>;
  private readonly _engine: LudiekEngine<Plugins, Evaluators, Consumers, Producers, Controllers>;
  public readonly config: LudiekGameConfig<Plugins, Features>;
  protected saveEncoder = new LudiekJsonSaveEncoder();
  protected _tickInterval: NodeJS.Timeout | null = null;

  private _onTick = new SignalDispatcher();

  protected _nextSave: number;

  constructor(
    engine: LudiekEngine<Plugins, Evaluators, Consumers, Producers, Controllers>,
    config: LudiekGameConfig<Plugins, Features>,
  ) {
    this._engine = engine;
    // TODO(@Isha): What to do with features?
    this.features = Object.fromEntries(config.features?.map((f) => [f.name, f]) ?? []) as FeatureMap<Features>;
    this.config = config;

    this._nextSave = this.config.saveInterval;

    this.featureList.forEach((feature) => {
      feature.init(this._engine.plugins);
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

    this._onTick.dispatch();
  }

  public evaluate(condition: LudiekCondition<Evaluators> | LudiekCondition<Evaluators>[]): boolean {
    return this._engine.evaluate(condition);
  }

  public handleTransaction(
    transaction: LudiekTransaction<LudiekInput<Consumers>, LudiekOutput<Producers>, LudiekCondition<Evaluators>>,
  ): boolean {
    return this._engine.handleTransaction(transaction);
  }

  public request(request: LudiekRequest<Controllers>): void {
    this._engine.request(request);
  }

  public get engine(): LudiekEngine<Plugins, Evaluators, Consumers, Producers, Controllers> {
    return this._engine;
  }

  public save(): LudiekSaveData {
    const featureData: LudiekFeaturesSaveData = {};
    this.featureList.forEach((feature) => {
      featureData[feature.name] = feature.save();
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
      const featureSaveData = saveData.features[feature.name];
      if (featureSaveData == null) {
        return;
      }
      feature.load(featureSaveData);
    });
    this._engine.load(saveData.engine);
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
