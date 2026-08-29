import { z } from 'zod';
import { LudiekDependencies, LudiekEngineContribution } from '@ludiek/engine/LudiekEngineContribution';
import { IsNonEmpty } from '@ludiek/util/types';

/**
 * Base shape for all outputs.
 */
export const BaseMutationSchema = z.looseObject({
  type: z.string(),
  amount: z.number(),
});

export type BaseMutation = z.infer<typeof BaseMutationSchema>;

export abstract class LudiekMutator<
  Mutation extends BaseMutation = BaseMutation,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineContribution<Dependencies> {
  declare readonly __mutation: Mutation;

  public abstract readonly schema: z.ZodObject<{
    type: z.ZodLiteral<Mutation['type']>;
  }>;

  get type(): Mutation['type'] {
    return this.schema.shape.type.value;
  }

  /**
   * Apply modifiers to this mutation.
   * Override to define your modifiers
   */
  public modify(mutation: Mutation): Mutation {
    return mutation;
  }

  /**
   * Whether this mutation can be applied
   * @param mutation
   */
  public abstract canApply(mutation: Mutation): boolean;

  /**
   * Apply the mutation
   * @param mutation
   */
  public abstract apply(mutation: Mutation): void;
}

/**
 * Given a tuple of LudiekMutators, produce a union of their Mutations.
 */
export type LudiekMutation<Mutators extends readonly LudiekMutator[]> =
  IsNonEmpty<Mutators> extends false ? never : NonNullable<Mutators[number]['__mutation']>;
