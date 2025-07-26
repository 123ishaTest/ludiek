import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { ISignal, SignalDispatcher } from 'strongly-typed-events';

export class LudiekGame<API extends Record<string, LudiekPlugin>, Features extends Record<string, LudiekFeature<API>>> {
  public features: Features;
  public engine: LudiekEngine<API>;

  private _onTick = new SignalDispatcher();

  constructor(engine: LudiekEngine<API>, features: Features) {
    this.engine = engine;
    this.features = features;

    this.featureList.forEach((feature) => {
      feature.init(this.engine.api);
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

  public get featureList(): LudiekFeature<API>[] {
    return Object.values(this.features);
  }

  /**
   * Emitted when a tick happens
   */
  public get onTick(): ISignal {
    return this._onTick.asEvent();
  }
}
