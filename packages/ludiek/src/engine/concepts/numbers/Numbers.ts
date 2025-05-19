import { EngineConcept } from '#ludiek/engine/concepts/EngineConcept';
import type { Number, NumberDefinition } from '#ludiek/engine/concepts/numbers/Number';
import { LiteralNumberDefinition } from '#ludiek/engine/concepts/numbers/instances/LiteralNumber';
import { IntBetweenNumberDefinition } from '#ludiek/engine/concepts/numbers/instances/IntBetweenNumber';
import type { Features } from '#ludiek/features/Features';

export class Numbers extends EngineConcept<NumberDefinition> {
  constructor() {
    super('numbers');
    this.register(new LiteralNumberDefinition());
    this.register(new IntBetweenNumberDefinition());
  }

  evaluate(number: Number, features: Features): number {
    return this.get(number.type).evaluate(number, features);
  }
}
