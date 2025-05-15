import { EngineConcept } from '@ludiek/engine/concepts/EngineConcept';
import type { Requirement, RequirementDefinition } from '@ludiek/engine/concepts/requirements/Requirement';
import type { Features } from '@ludiek/features/Features';

export class Requirements extends EngineConcept<RequirementDefinition> {
  constructor() {
    super('requirements');
  }

  public hasRequirement(requirement: Requirement, features: Features): boolean {
    return this.get(requirement.type).isFulfilled(requirement, features);
  }
}
