import type { Features } from '$lib/ludiek/features/Features';
import { type Engine } from '$lib/ludiek/engine/Engine';
import type { Content } from '$lib/ludiek/content/Content';
import type { Feature } from '$lib/ludiek/features/Feature';

export class Game {
  /**
   * Object with registered features. If you want them as a list use this.featureList
   */
  public features: Features;
  public engine: Engine;
  public content: Content;

  constructor(features: Features, engine: Engine, content: Content) {
    this.features = features;
    this.engine = engine;
    this.content = content;

    this.inject();
  }

  public inject(): void {
    // Inject all features into each other
    this.featureList.forEach((feature) => feature._inject(this.features, this.engine, this.content));
    this.engine.injectFeatures(this.features);
  }

  private get featureList(): Feature[] {
    return Object.values(this.features);
  }
}
