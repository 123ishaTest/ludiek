import { LudiekEngineContribution } from '@ludiek/engine/LudiekEngineContribution';
import { AnyEngine, ContributionSchemas, HasSchema } from '@ludiek/util/types';
import { ConditionNotFoundError } from '@ludiek/engine/condition/ConditionError';
import z, { ZodDiscriminatedUnion, ZodNever } from 'zod';

export class LudiekEngineConcept<
  const ContributionKind extends LudiekEngineContribution & HasSchema,
  const Contributions extends readonly ContributionKind[],
> {
  private readonly _contributions: Record<string, ContributionKind> = {};
  private readonly _engine: AnyEngine;

  constructor(_engine: AnyEngine) {
    this._engine = _engine;
  }

  public register(contribution: ContributionKind): void {
    contribution.inject(this._engine);
    this._contributions[contribution.type] = contribution;
  }

  /**
   * Get a contribution or throw an error if it doesn't exist
   * @param type
   * @private
   */
  protected get(type: string): ContributionKind {
    const contribution = this._contributions[type];

    if (contribution == null) {
      const registeredContribution = Object.keys(this._contributions).join(', ');
      throw new ConditionNotFoundError(
        `Cannot evaluate condition of type '${type}' because its evaluator is not registered. Registered evaluators are: ${registeredContribution}`,
      );
    }
    return contribution;
  }

  public get list(): Contributions {
    return Object.values(this._contributions) as unknown as Contributions;
  }

  public get schema(): ZodNever | ZodDiscriminatedUnion<ContributionSchemas<Contributions>, 'type'> {
    const schemas = this.list.map((e) => e.schema);
    return schemas.length === 0 ? z.never() : z.discriminatedUnion('type', schemas as never);
  }
}
