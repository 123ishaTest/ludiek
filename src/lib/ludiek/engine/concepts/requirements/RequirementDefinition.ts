import type { Requirement } from '$lib/ludiek/engine/concepts/requirements/RequirementSchema';
import type { Features } from '$lib/ludiek/features/Features';
import type { ZodDiscriminatedUnionOption } from 'zod';

export abstract class RequirementDefinition {
  abstract key: string;
  abstract schema: ZodDiscriminatedUnionOption<'type'>;

  abstract isFulfilled(requirement: Requirement, features: Features): boolean;
}
