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
   * Whether this output can be gained
   * @param output
   */
  public abstract canGain(output: Output): boolean;

  /**
   * Applying the output
   * @param output
   */
  public abstract gain(output: Output): void;
}

/**
 * Given a tuple of LudiekProducers, produce a union of their outputs.
 */
export type Output<Producers extends readonly LudiekProducer[]> =
  IsNonEmpty<Producers> extends false ? never : Producers[number] extends LudiekProducer<infer Output> ? Output : never;
