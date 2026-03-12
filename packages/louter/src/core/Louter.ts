import type { KindDefinitions } from '@louter/core/types';
import type { LouterStage } from '@louter/core/LouterStage';
import type { LouterContext } from '@louter/core/LouterContext';
import { createContext } from '@louter/core/util';

export class Louter {
  private readonly _stages: LouterStage[];

  constructor(stages: LouterStage[]) {
    this._stages = stages;
  }

  public run<Kinds extends KindDefinitions>(kinds: Kinds): LouterContext<Kinds> {
    const ctx = createContext(kinds);
    this._stages.forEach((stage) => stage.run(ctx));
    return ctx;
  }
}
