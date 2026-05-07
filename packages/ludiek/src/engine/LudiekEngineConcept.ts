import { LudiekEngineContribution } from '@ludiek/engine/LudiekEngineContribution';
import { AnyEngine, ContributionSchemas, HasSchema } from '@ludiek/util/types';
import z, { ZodDiscriminatedUnion, ZodNever } from 'zod';

export abstract class LudiekEngineConcept<
  const ContributionKind extends LudiekEngineContribution & HasSchema,
  const Contributions extends readonly ContributionKind[],
> {
  private readonly _contributions: Record<string, ContributionKind> = {};
  protected readonly _engine: AnyEngine;

  constructor(_engine: AnyEngine) {
    this._engine = _engine;
  }

  public abstract raiseNotfoundError(type: string, registeredContributions: string[]): void;

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
      const registeredContributions = this.list.map((c) => c.type);
      this.raiseNotfoundError(type, registeredContributions);
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
