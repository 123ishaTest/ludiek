import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { BaseRequirement, RequirementChecker } from '@ludiek/engine/LudiekRequirement';

export class LudiekGame<
  API extends Record<string, LudiekPlugin>,
  Checkers extends RequirementChecker<BaseRequirement>[],
  Features extends Record<string, LudiekFeature<API>>,
> {
  public features: Features;
  public engine: LudiekEngine<API, Checkers>;

  constructor(engine: LudiekEngine<API, Checkers>, features: Features) {
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

  public get featureList(): LudiekFeature<API>[] {
    return Object.values(this.features);
  }
}
