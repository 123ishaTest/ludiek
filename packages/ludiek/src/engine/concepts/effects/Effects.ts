import { EngineConcept } from '#ludiek/engine/concepts/EngineConcept';
import type { Effect, EffectDefinition } from '#ludiek/engine/concepts/effects/Effect';
import { PrintEffectDefinition } from '#ludiek/engine/concepts/effects/instances/PrintEffect';
import type { Features } from '#ludiek/features/Features';

export class Effects extends EngineConcept<EffectDefinition> {
  constructor() {
    super('effects');
    this.register(new PrintEffectDefinition());
  }

  perform(effect: Effect, features: Features): void {
    this.get(effect.type).perform(effect, features);
  }
}
