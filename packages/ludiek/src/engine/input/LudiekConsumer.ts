import { LudiekDependencies, LudiekEngineContribution } from '@ludiek/engine/LudiekEngineContribution';
import { IsNonEmpty } from '@ludiek/util/types';
import { z } from 'zod';

/**
 * Base shape for all inputs.
 */
export const BaseInputSchema = z.strictObject({
  type: z.string(),
  amount: z.number(),
});

export type BaseInput = z.infer<typeof BaseInputSchema>;

export abstract class LudiekConsumer<
  Input extends BaseInput = BaseInput,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineContribution<Dependencies> {
  declare readonly __input: Input;

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
  IsNonEmpty<Consumers> extends false ? never : NonNullable<Consumers[number]['__input']>;
