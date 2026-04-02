import { z } from 'zod';
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
  declare readonly __output: Output;

  public abstract readonly schema: z.ZodObject<{
    type: z.ZodLiteral<Output['type']>;
  }>;

  get type(): Output['type'] {
    return this.schema.shape.type.value;
  }

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
 * Given a tuple of LudiekProducers, produce a union of their Outputs.
 */
export type LudiekOutput<Producers extends readonly LudiekProducer[]> =
  IsNonEmpty<Producers> extends false ? never : NonNullable<Producers[number]['__output']>;

/**
 * Given a tuple of LudiekProducers, produce a union of their schemas.
 */
export type ProducerSchemas<Producers extends readonly LudiekProducer[]> = {
  [Key in keyof Producers]: Producers[Key] extends LudiekProducer ? Producers[Key]['schema'] : never;
};
