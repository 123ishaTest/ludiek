import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { ISignal, SignalDispatcher } from 'strongly-typed-events';
import { LudiekFeaturesSaveData, LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { LudiekLocalStorage } from '@ludiek/engine/peristence/LudiekLocalStorage';
import { LudiekJsonSaveEncoder } from '@ludiek/engine/peristence/LudiekJsonSaveEncoder';
import { LudiekGameConfig } from '@ludiek/engine/LudiekGameConfig';
import { LudiekInput } from '@ludiek/engine/transactions/LudiekInput';
import { LudiekOutput } from '@ludiek/engine/transactions/LudiekOutput';
import { LudiekController, RequestHistory, RequestShape } from '@ludiek/engine/LudiekRequest';
import { ControllerNotFoundError } from '@ludiek/engine/LudiekError';
import { PluginMap } from '@ludiek/engine/LudiekConfiguration';

export type FeatureMap<Plugins extends readonly LudiekPlugin[], Features extends readonly LudiekFeature<PluginMap<Plugins>>[]> = {
  [Feature in Features[number] as Feature['name']]: Extract<Features[number], { name: Feature['name'] }>;
};


export class LudiekGame<
  Plugins extends readonly LudiekPlugin[],
  Conditions extends readonly LudiekCondition[],
  Inputs extends readonly LudiekInput[],
  Outputs extends readonly LudiekOutput[],
  Features extends readonly LudiekFeature<PluginMap<Plugins>>[],

> {
  public features: FeatureMap<Plugins, Features>;
  public engine: LudiekEngine<Plugins, Conditions, Inputs, Outputs>;
  public config: LudiekGameConfig<Plugins, Features>;
  protected saveEncoder = new LudiekJsonSaveEncoder();
  protected _tickInterval: NodeJS.Timeout | null = null;

  private _onTick = new SignalDispatcher();

  protected _nextSave: number;

  private _requestHistory: RequestHistory;
  private _controllers: Record<string, LudiekController> = {};

  constructor(
    engine: LudiekEngine<Plugins, Conditions, Inputs, Outputs>,
    config: LudiekGameConfig<Plugins, Features>,
  ) {
    this.engine = engine;
    this.features = Object.fromEntries(
      config.features.map(f => [f.name, f])
    ) as FeatureMap<Plugins, Features>;


    this._requestHistory = new RequestHistory()
    this.config = config;

    this._nextSave = this.config.saveInterval;


    this.featureList.forEach((feature) => {
      feature.init(this.engine.plugins);

      feature.controllers.forEach(c => {
        this._controllers[c.type] = c;
      })
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

  public get requestHistory(): RequestHistory {
    return this._requestHistory;
  }

  public resolve(request: RequestShape<Features[number]['controllers']>): void {
    this._requestHistory.add(request);
    const controller = this._controllers[request.type];
    if(!controller) {
      const registeredResolvers = Object.keys(this._controllers).join(', ');
      throw new ControllerNotFoundError(`Cannot resolve request of type '${request.type}' because its resolver is not registered. Registered processors are: ${registeredResolvers}`);
    }

    controller.resolve(request);
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
