import { LudiekDependencies, LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { IsNonEmpty } from '@ludiek/util/types';

export interface BaseOutput {
  type: string;
  amount: number;
}

export abstract class LudiekProducer<
  Output extends BaseOutput = BaseOutput,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineConcept<Dependencies> {
  public abstract readonly type: Output['type'];

  /**
   * Apply modifiers to this output.
   * Override to define your modifiers
   */
  public modify(output: Output): Output {
    return output;
  }

  /**
   * Whether this output can be produced
   * @param output
   */
  public abstract canProduce(output: Output): boolean;

  /**
   * Produce the output
   * @param output
   */
  public abstract produce(output: Output): void;
}

/**
 * Given a tuple of LudiekProducers, produce a union of their outputs.
 */
export type LudiekOutput<Producers extends readonly LudiekProducer[]> =
  IsNonEmpty<Producers> extends false ? never : Producers[number] extends LudiekProducer<infer Output> ? Output : never;
