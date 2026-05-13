import { z } from 'zod';
import { LudiekDependencies, LudiekEngineContribution } from '@ludiek/engine/LudiekEngineContribution';
import { IsNonEmpty } from '@ludiek/util/types';

/**
 * Base shape for all bonuses.
 */
export const BaseBonusSchema = z.strictObject({
  type: z.string(),
});

export type BaseBonus = z.infer<typeof BaseBonusSchema>;

export const BonusContributionSchema = z.looseObject({
  type: z.string(),
  amount: z.number(),
  source: z.string().optional(),
});

export type BonusContribution = z.infer<typeof BonusContributionSchema>;

export abstract class LudiekModifier<
  Bonus extends BaseBonus = BaseBonus,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineContribution<Dependencies> {
  declare readonly __bonus?: Bonus;

  public abstract readonly schema: z.ZodObject<{
    type: z.ZodLiteral<Bonus['type']>;
  }>;

  get type(): Bonus['type'] {
    return this.schema.shape.type.value;
  }
  public abstract readonly variant: 'additive' | 'multiplicative';
  public abstract readonly default: number;

  /**
   * Whether this output can be produced
   * @param modifier
   */
  public abstract stringify(modifier: Bonus): string;
}

/**
 * Given a tuple of LudiekModifiers, produce a union of their Bonuses.
 */
export type LudiekBonus<Modifiers extends readonly LudiekModifier[]> =
  IsNonEmpty<Modifiers> extends false ? never : NonNullable<Modifiers[number]['__bonus']>;

export type LudiekBonusContribution<Modifiers extends readonly LudiekModifier[]> = LudiekBonus<Modifiers> & {
  amount: number;
};
