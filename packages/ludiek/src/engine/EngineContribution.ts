import type { NumberDefinition } from '#ludiek/engine/concepts/numbers/Number';
import type { EffectDefinition } from '#ludiek/engine/concepts/effects/Effect';
import type { RequirementDefinition } from '#ludiek/engine/concepts/requirements/Requirement';
import type { ContentDefinition } from '#ludiek/content/ContentDefinition';

export interface EngineContribution {
  engine?: {
    numbers?: NumberDefinition[];
    effects?: EffectDefinition[];
    requirements?: RequirementDefinition[];
  };
  content?: ContentDefinition[];
}
