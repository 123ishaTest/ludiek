import type { LouterContext } from '@louter/core/LouterContext';
import type { KindDefinitions } from '@louter/core/types';

export interface LouterStage<Kinds extends KindDefinitions> {
  run(ctx: LouterContext<Kinds>): void;
}
