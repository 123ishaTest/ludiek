import type { KindDefinitions } from '$lib/core/types.js';
import type { LouterStage } from '$lib/core/LouterStage.js';
import type { LouterContext } from '$lib/core/LouterContext.js';

export class Louter<Kinds extends KindDefinitions> {
  private readonly _stages: LouterStage<Kinds>[];

  constructor(stages: LouterStage<Kinds>[]) {
    this._stages = stages;
  }

  public run(kinds: Kinds): LouterContext<Kinds> {
    const ctx = this.createContext(kinds)
    this._stages.forEach((stage) => stage.run(ctx));
    return ctx;
  }

  private createContext(kinds: Kinds): LouterContext<Kinds> {
    return {
      config: {
        debug: true,
      },
      content: {},
      files: [],
      kinds: kinds,
      objects: [],
      warnings: [],
    };
  }


}
