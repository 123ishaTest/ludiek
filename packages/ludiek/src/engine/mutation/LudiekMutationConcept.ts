import { LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { LudiekMutator, LudiekMutation } from '@ludiek/engine/mutation/LudiekMutator';
import { cloneDeep } from 'es-toolkit';
import { MutationNotFoundError } from '@ludiek/engine/mutation/MutationError';

export class LudiekMutationConcept<const Mutators extends readonly LudiekMutator[]> extends LudiekEngineConcept<
  LudiekMutator,
  Mutators
> {
  public raiseNotfoundError(type: string, registeredContributions: string[]): never {
    throw new MutationNotFoundError(
      `Cannot apply mutation of type '${type}' because its mutator is not registered. Registered mutators are: ${registeredContributions.join(', ')}`,
    );
  }
  /**
   * Checks whether we can apply the mutation
   * @param mutation
   */
  public canApply(mutation: LudiekMutation<Mutators> | LudiekMutation<Mutators>[]): boolean {
    if (!Array.isArray(mutation)) {
      mutation = [mutation];
    }

    return mutation.every((i) => {
      const mutator = this.get(i.type);
      const modified = mutator.modify(cloneDeep(i));
      return mutator.canApply(modified);
    });
  }

  /**
   * Apply the mutation with no regards for whether we can.
   * @param mutation
   */
  public apply(mutation: LudiekMutation<Mutators> | LudiekMutation<Mutators>[]): void {
    if (!Array.isArray(mutation)) {
      mutation = [mutation];
    }

    mutation.forEach((i) => {
      const mutator = this.get(i.type);
      const modified = mutator.modify(cloneDeep(i));
      mutator.apply(modified);
    });
  }
  
  public modify<Mutation extends LudiekMutation<Mutators>>(mutation: Mutation): Mutation {
    const mutator = this.get(mutation.type);
    return mutator.modify(cloneDeep(mutation)) as Mutation;
  }
}
