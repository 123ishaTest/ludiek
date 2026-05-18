import { LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { BonusContribution, LudiekBonus, LudiekModifier } from '@ludiek/engine/bonus/LudiekModifier';
import { BonusNotFoundError } from '@ludiek/engine/bonus/BonusError';
import { AnyEngine, ContributionSchemas } from '@ludiek/util/types';
import z, { ZodDiscriminatedUnion, ZodNever } from 'zod';

export class LudiekBonusConcept<const Modifiers extends readonly LudiekModifier[]> extends LudiekEngineConcept<
  LudiekModifier,
  Modifiers
> {
  private readonly _activeBonuses: Record<string, Record<string, BonusContribution[]>>;

  constructor(engine: AnyEngine, state = {}) {
    super(engine);
    // TODO(@Isha): Check if this state can still be made reactive
    this._activeBonuses = state;
  }

  public raiseNotfoundError(type: string, registeredContributions: string[]): never {
    throw new BonusNotFoundError(
      `Cannot calculate bonus of type '${type}' because its modifier is not registered. Registered modifiers are: ${registeredContributions.join(', ')}`,
    );
  }

  public getBonus(bonus: LudiekBonus<Modifiers>): number {
    // TODO(@Isha): Should this be cached between ticks too?
    const modifier = this.get(bonus.type);

    const identifier = modifier.stringify(bonus);
    const values = Object.values(this._activeBonuses).flatMap((record) => {
      return record[identifier] ?? [];
    });

    switch (modifier.variant) {
      case 'additive':
        return values.reduce((sum, modifier) => sum + modifier.amount, modifier.default);
      case 'multiplicative':
        return values.reduce((sum, modifier) => sum * (1 + modifier.amount), modifier.default);
      default:
        this._engine.logger.error(`Unknown variant '${modifier.variant}' for resolver ${modifier}`);
        return 0;
    }
  }

  /**
   * Collects all bonuses from plugins and stores them in a local dictionary
   * @private
   */
  public collectBonuses(): void {
    // TODO(@Isha): Check all features too

    this._engine.pluginList.forEach((plugin) => {
      // Reset all previous bonuses
      this._activeBonuses[plugin.type] = {};

      const bonuses = plugin.getBonuses?.();

      bonuses?.forEach((bonus) => {
        const modifier = this.get(bonus.type);
        const identifier = modifier.stringify(bonus);
        if (this._activeBonuses[plugin.type][identifier]) {
          this._activeBonuses[plugin.type][identifier].push(bonus);
        } else {
          this._activeBonuses[plugin.type][identifier] = [bonus];
        }
      });
    });
  }

  public get activeBonuses(): Record<string, Record<string, BonusContribution[]>> {
    return this._activeBonuses;
  }

  public get schema(): ZodNever | ZodDiscriminatedUnion<ContributionSchemas<Modifiers>, 'type'> {
    const schemas = this.list.map((e) => e.schema.extend({ amount: z.number() }));
    return schemas.length === 0 ? z.never() : z.discriminatedUnion('type', schemas as never);
  }
}
