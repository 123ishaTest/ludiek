import { LudiekEngineContribution } from '@ludiek/engine/LudiekEngineContribution';
import { AnyEngine, ContributionSchemas, HasSchema } from '@ludiek/util/types';
import z, { ZodDiscriminatedUnion, ZodNever } from 'zod';

type ContributionByType<
  Contributions extends readonly LudiekEngineContribution[],
  Type extends Contributions[number]['type'],
> = Extract<Contributions[number], { type: Type }>;

export abstract class LudiekEngineConcept<
  const ContributionKind extends LudiekEngineContribution & HasSchema,
  const Contributions extends readonly ContributionKind[],
> {
  private readonly _contributions = new Map<string, ContributionKind>();
  protected readonly _engine: AnyEngine;

  constructor(_engine: AnyEngine) {
    this._engine = _engine;
  }

  public abstract raiseNotfoundError(type: string, registeredContributions: string[]): never;

  public register<Contribution extends Contributions[number]>(contribution: Contribution): void {
    contribution.inject(this._engine);
    this._engine.logger.debug(`Registered ${contribution.type}`);

    this._contributions.set(contribution.type, contribution);
  }

  /**
   * Get a contribution or throw an error if it doesn't exist
   * @param type
   * @private
   */
  public get<Type extends Contributions[number]['type']>(type: Type): ContributionByType<Contributions, Type> {
    const contribution = this._contributions.get(type);

    if (contribution == null) {
      const registeredContributions = this.list.map((c) => c.type);
      this.raiseNotfoundError(type, registeredContributions);
    }
    return contribution as ContributionByType<Contributions, Type>;
  }

  public get list(): Contributions {
    return Array.from(this._contributions.values()) as unknown as Contributions;
  }

  public get schema(): ZodNever | ZodDiscriminatedUnion<ContributionSchemas<Contributions>, 'type'> {
    const schemas = this.list.map((e) => e.schema);
    return schemas.length === 0 ? z.never() : z.discriminatedUnion('type', schemas as never);
  }
}
