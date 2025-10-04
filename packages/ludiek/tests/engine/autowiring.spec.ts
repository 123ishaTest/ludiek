import { describe, expect, it } from 'vitest';
import { EngineNotInjectedError } from '@ludiek/engine/LudiekError';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { BaseCondition } from '@ludiek/engine/condition/LudiekEvaluator';

class ExamplePlugin extends LudiekPlugin {
  name = 'example';
  public config = {};

  protected _state = {};

  loadContent() {}

  public evaluate(condition: BaseCondition) {
    return super.evaluate(condition);
  }
}

describe('Engine Autowiring', () => {
  it('errors when the engine is not injected', () => {
    // Arrange
    const plugin = new ExamplePlugin();

    // Act
    expect(() => {
      plugin.evaluate({ type: 'any' });
    }).toThrow(EngineNotInjectedError);
  });
});
