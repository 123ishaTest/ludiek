import { LudiekDependencies, LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { IsNonEmpty } from '@ludiek/util/types';

export interface BaseInput {
  type: string;
  amount: number;
}

export abstract class LudiekConsumer<
  Input extends BaseInput = BaseInput,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineConcept<Dependencies> {
  public abstract readonly type: Input['type'];

  /**
   * Whether we can consume the input (i.e. have it)
   * @param input
   */
  abstract canConsume(input: Input): boolean;

  /**
   * Consume the input
   * @param input
   */
  abstract consume(input: Input): void;
}

/**
 * Given a tuple of LudiekConsumers, produce a union of their inputs.
 */
export type LudiekInput<Consumers extends readonly LudiekConsumer[]> =
  IsNonEmpty<Consumers> extends false ? never : Consumers[number] extends LudiekConsumer<infer Input> ? Input : never;
