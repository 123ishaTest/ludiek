import { LudiekEngine, LudiekAPI } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';

export class LudiekGame<PL extends LudiekPlugin[], T extends Record<string, LudiekFeature<LudiekAPI<PL>>>> {
  public features: T;
  public engine: LudiekEngine<PL>;

  constructor(engine: LudiekEngine<PL>, features: T) {
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
  }

  public get featureList(): LudiekFeature<LudiekAPI<PL>>[] {
    return Object.values(this.features);
  }
}
