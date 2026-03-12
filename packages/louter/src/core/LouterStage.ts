import type { LouterContext } from '@louter/core/LouterContext';
import type { KindDefinitions } from '@louter/core/types';

export interface LouterStage {
  run<Kinds extends KindDefinitions>(ctx: LouterContext<Kinds>): void;
}
