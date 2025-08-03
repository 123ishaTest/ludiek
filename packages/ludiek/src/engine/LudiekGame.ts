import { LudiekEngine, PluginMap } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { ISignal, SignalDispatcher } from 'strongly-typed-events';

export class LudiekGame<
  Plugins extends LudiekPlugin[],
  Features extends Record<string, LudiekFeature<PluginMap<Plugins>>>,
> {
  public features: Features;
  public engine: LudiekEngine<Plugins>;

  private _onTick = new SignalDispatcher();

  constructor(engine: LudiekEngine<Plugins>, features: Features) {
    this.engine = engine;
    this.features = features;

    this.featureList.forEach((feature) => {
      feature.init(this.engine.plugins);
    });
  }

  public start(): void {
    setInterval(() => {
      this.tick(1);
    }, 1000);
  }

  public tick(delta: number): void {
    this.featureList.forEach((feature) => feature.update?.(delta));
    this._onTick.dispatch();
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
