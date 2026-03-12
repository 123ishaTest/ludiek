import type { KindDefinitions } from '@louter/core/types';
import type { LouterStage } from '@louter/core/LouterStage';
import type { LouterContext } from '@louter/core/LouterContext';
import { createContext } from '@louter/core/util';

export class Louter<Kinds extends KindDefinitions> {
  private readonly _stages: LouterStage<Kinds>[];

  constructor(stages: LouterStage<Kinds>[]) {
    this._stages = stages;
  }

  public run(kinds: Kinds): LouterContext<Kinds> {
    const ctx = createContext(kinds);
    this._stages.forEach((stage) => stage.run(ctx));
    return ctx;
  }
}
