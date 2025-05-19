import { z } from 'zod';
import { EngineConceptDefinition } from '#ludiek/engine/concepts/EngineConceptDefinition';
import type { Features } from '#ludiek/features/Features';
import { EngineConceptSchema } from '#ludiek/engine/concepts/EngineConceptSchema';

/**
 * Extend this class to create a new effect definition.
 */
export abstract class EffectDefinition extends EngineConceptDefinition {
  abstract perform(effect: Effect, features: Features): void;
}

export const EffectSchema = EngineConceptSchema.brand<'effect'>();

export type Effect = z.infer<typeof EffectSchema>;
