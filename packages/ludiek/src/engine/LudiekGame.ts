import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { PluginMap } from '@ludiek/engine/LudiekEngineConfig';
import { LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { ISignal, SignalDispatcher } from 'strongly-typed-events';
import { LudiekFeaturesSaveData, LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { LudiekLocalStorage } from '@ludiek/engine/peristence/LudiekLocalStorage';
import { LudiekJsonSaveEncoder } from '@ludiek/engine/peristence/LudiekJsonSaveEncoder';
import { LudiekGameConfig } from '@ludiek/engine/LudiekGameConfig';
import { LudiekInput } from '@ludiek/engine/input/LudiekInput';
import { LudiekOutput } from '@ludiek/engine/output/LudiekOutput';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';
import { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';
import { RequestShape } from '@ludiek/engine/request/LudiekRequestType';
import { ConditionShape } from '@ludiek/engine/condition/LudiekConditionType';
import { InputShape } from '@ludiek/engine/input/LudiekInputType';
import { OutputShape } from '@ludiek/engine/output/LudiekOutputType';

export type FeatureMap<Features extends LudiekFeature<Record<string, LudiekPlugin>>[]> = {
  [Feature in Features[number] as Feature['name']]: Extract<Features[number], { name: Feature['name'] }>;
};

export class LudiekGame<
  Plugins extends LudiekPlugin[],
  Features extends LudiekFeature<PluginMap<Plugins>>[],
  EngineConditions extends LudiekCondition[] | undefined = undefined,
  EngineInputs extends LudiekInput[] | undefined = undefined,
  EngineOutputs extends LudiekOutput[] | undefined = undefined,
  EngineControllers extends LudiekController[] | undefined = undefined,
  Conditions extends LudiekCondition[] | undefined = undefined,
  Inputs extends LudiekInput[] | undefined = undefined,
  Outputs extends LudiekOutput[] | undefined = undefined,
  Controllers extends LudiekController[] | undefined = undefined,
> {
  public readonly features: FeatureMap<Features>;
  private readonly _engine: LudiekEngine<Plugins, EngineConditions, EngineInputs, EngineOutputs, EngineControllers>;
  public readonly config: LudiekGameConfig<Plugins, Features, Conditions, Inputs, Outputs, Controllers>;
  protected saveEncoder = new LudiekJsonSaveEncoder();
  protected _tickInterval: NodeJS.Timeout | null = null;

  private _onTick = new SignalDispatcher();

  protected _nextSave: number;

  constructor(
    engine: LudiekEngine<Plugins, EngineConditions, EngineInputs, EngineOutputs, EngineControllers>,
    config: LudiekGameConfig<Plugins, Features, Conditions, Inputs, Outputs, Controllers> & { features: Features },
  ) {
    this._engine = engine;
    this.features = Object.fromEntries(config.features?.map((f) => [f.name, f]) ?? []) as FeatureMap<Features>;

    this.config = config;

    this._nextSave = this.config.saveInterval;

    this.featureList.forEach((feature) => {
      feature.init(this._engine.plugins);

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

  public get engine(): LudiekEngine<Plugins, EngineConditions, EngineInputs, EngineOutputs, EngineControllers> {
    return this._engine;
  }

  public request(request: RequestShape<Plugins | Features, Controllers | EngineControllers>): void {
    return this._engine.request(request as RequestShape<Plugins, EngineControllers>);
  }

  public evaluate(condition: ConditionShape<Plugins | Features, Conditions | EngineConditions>): boolean {
    return this._engine.evaluate(condition);
  }

  public canLoseInput(input: InputShape<Plugins | Features, Inputs | EngineInputs>): boolean {
    return this._engine.canLoseInput(input);
  }

  public loseInput(input: InputShape<Plugins | Features, Inputs | EngineInputs>): void {
    this._engine.loseInput(input);
  }

  public canGainOutput(output: OutputShape<Plugins | Features, Outputs | EngineOutputs>): boolean {
    return this._engine.canGainOutput(output);
  }

  public gainOutput(output: OutputShape<Plugins | Features, Outputs | EngineOutputs>): void {
    this._engine.gainOutput(output);
  }

  public handleTransaction(
    transaction: LudiekTransaction<
      InputShape<Plugins, EngineInputs>,
      OutputShape<Plugins, EngineOutputs>,
      ConditionShape<Plugins, EngineConditions>
    >,
  ): boolean {
    return this._engine.handleTransaction(transaction);
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
