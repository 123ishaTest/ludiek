import type { LouterContext } from '$lib/core/LouterContext.js';
import type { KindDefinitions } from '$lib/core/types.js';

export interface LouterStage<Kinds extends KindDefinitions> {
  run(ctx: LouterContext<Kinds>): void;
}
