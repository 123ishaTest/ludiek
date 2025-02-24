import type { RequirementDefinition } from '$lib/ludiek/engine/concepts/requirements/RequirementDefinition';
import type { Requirement } from '$lib/ludiek/engine/concepts/requirements/RequirementSchema';
import { z } from 'zod';
import type { Features } from '$lib/ludiek/features/Features';
import type { ZodDiscriminatedUnionOption } from 'zod';

export class Engine {
  private _features!: Features;

  public injectFeatures(features: Features): void {
    this._features = features;
  }

  readonly requirementDefinitions: Record<string, RequirementDefinition> = {};

  registerRequirement(definition: RequirementDefinition): void {
    this.requirementDefinitions[definition.key] = definition;
  }

  public hasRequirement(requirement: Requirement): boolean {
    return this.requirementDefinitions[requirement.type].isFulfilled(requirement, this._features);
  }

  public introspect() {
    const requirementSchemas = Object.values(this.requirementDefinitions).map((def) => def.schema) as unknown as readonly [
      ZodDiscriminatedUnionOption<'type'>,
      ...ZodDiscriminatedUnionOption<'type'>[],
    ];

    return {
      requirements: z.discriminatedUnion('type', requirementSchemas),
    };
  }
}
