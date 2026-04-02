import { z } from 'zod';
import { LudiekDependencies, LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { IsNonEmpty } from '@ludiek/util/types';

export interface BaseBonus {
  type: string;
}

export interface BonusContribution {
  type: string;
  amount: number;
  source?: string;
}

export abstract class LudiekModifier<
  Bonus extends BaseBonus = BaseBonus,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineConcept<Dependencies> {
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

/**
 * Given a tuple of LudiekModifiers, produce a union of their schemas.
 */
export type ModifierSchemas<Modifiers extends readonly LudiekModifier[]> = {
  [Key in keyof Modifiers]: Modifiers[Key] extends LudiekModifier ? Modifiers[Key]['schema'] : never;
};

export type LudiekBonusContribution<Modifiers extends readonly LudiekModifier[]> = LudiekBonus<Modifiers> & {
  amount: number;
};
