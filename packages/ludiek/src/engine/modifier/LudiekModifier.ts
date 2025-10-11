import { LudiekDependencies, LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { IsNonEmpty } from '@ludiek/util/types';

export interface BaseBonus {
  type: string;
}

export interface BonusContribution {
  type: string;
  amount: number;
  source: string;
}

export abstract class LudiekModifier<
  Bonus extends BaseBonus = BaseBonus,
  Dependencies extends LudiekDependencies = object,
> extends LudiekEngineConcept<Dependencies> {
  public abstract readonly type: Bonus['type'];

  public abstract readonly variant: 'additive' | 'multiplicative';
  public abstract readonly default: number;

  /**
   * Whether this output can be produced
   * @param modifier
   */
  public abstract stringify(modifier: Bonus): string;
}

/**
 * Given a tuple of LudiekModifiers, produce a union of their bonuses.
 */
export type LudiekBonus<Modifiers extends readonly LudiekModifier[]> =
  IsNonEmpty<Modifiers> extends false ? never : Modifiers[number] extends LudiekModifier<infer Bonus> ? Bonus : never;

export type LudiekBonusContribution<Modifiers extends readonly LudiekModifier[]> = LudiekBonus<Modifiers> & {
  amount: number;
};
