import { LudiekDependencies, LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { IsNonEmpty } from '@ludiek/util/types';
import { z } from 'zod';

export interface BaseInput {
  type: string;
  amount: number;
}

export abstract class LudiekConsumer<
  Input extends BaseInput = BaseInput,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineConcept<Dependencies> {
  public abstract readonly schema: z.ZodObject<{
    type: z.ZodLiteral<Input['type']>;
  }>;

  get type(): Input['type'] {
    return this.schema.shape.type.value;
  }

  /**
   * Apply modifiers to this input.
   * Override to define your modifiers
   */
  public modify(input: Input): Input {
    return input;
  }

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
 * Given a tuple of LudiekConsumers, produce a union of their Inputs.
 */
export type LudiekInput<Consumers extends readonly LudiekConsumer[]> =
  IsNonEmpty<Consumers> extends false ? never : Consumers[number] extends LudiekConsumer<infer Input> ? Input : never;

/**
 * Given a tuple of LudiekConsumers, produce a union of their schemas.
 */
export type ConsumerSchemas<Consumers extends readonly LudiekConsumer[]> = {
  [Key in keyof Consumers]: Consumers[Key] extends LudiekConsumer ? Consumers[Key]['schema'] : never;
};
