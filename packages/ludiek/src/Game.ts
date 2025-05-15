import type { Features } from './features/Features';
import { type Engine } from './engine/Engine';
import type { Content } from './content/Content';
import type { Feature } from './features/Feature';

export class Game {
  public engine: Engine;
  /**
   * Object with registered features. If you want them as a list use this.featureList
   */
  public features: Features;
  public content: Content;

  constructor(engine: Engine, features: Features, content: Content) {
    this.engine = engine;
    this.features = features;
    this.content = content;

    this.prepareFeatures();
  }

  public prepareFeatures(): void {
    // Inject all features into each other
    this.featureList.forEach((feature) => feature._inject(this.features, this.engine, this.content));
    this.engine.injectFeatures(this.features);

    this.featureList.forEach((feature) => feature.configure?.());
    this.featureList.forEach((feature) => feature.content?.());
    this.featureList.forEach((feature) => feature.initialize?.());
  }

  /**
   * Recursively save all registered features
   */
  public save(): void {
    const res: Record<string, unknown> = {};
    for (const feature of this.featureList) {
      res[feature.saveKey] = feature.save();
    }
  }

  public get featureList(): Feature[] {
    return Object.values(this.features);
  }
}
