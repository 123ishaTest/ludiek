import { it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { AlwaysTrueCondition } from '@ludiek/engine/evaluators/AlwaysTrueCondition';

it('is type-safe when plugins and conditions exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new CurrencyPlugin()],
    conditions: [new AlwaysTrueCondition()],
  });

  // Valid
  engine.evaluate({ type: 'has-currency', amount: 4, id: 'test' });
  engine.evaluate({ type: 'always-true' });

  // @ts-expect-error unknown type
  engine.evaluate({ type: 'wrong' });

  // @ts-expect-error should have more arguments
  engine.evaluate({ type: 'has-currency' });
});

it('is type-safe when only plugins exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    plugins: [new CurrencyPlugin()],
  });

  // Valid
  engine.evaluate({ type: 'has-currency', amount: 4, id: 'test' });
  // @ts-expect-error unknown type
  engine.evaluate({ type: 'wrong' });
});

it('is type-safe when only conditions exists', () => {
  // Arrange
  const engine = new LudiekEngine({
    conditions: [new AlwaysTrueCondition()],
  });

  // Valid
  engine.evaluate({ type: 'always-true' });

  // @ts-expect-error unknown type
  engine.evaluate({ type: 'wrong' });
});

it('it collapses to never when neither exist', () => {
  // Arrange
  const engine = new LudiekEngine({});

  // @ts-expect-error unknown type
  engine.evaluate({ type: 'wrong' });
});
