import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { EmptyProducer } from '@tests/shared/EmptyOutput';
import { OutputNotFoundError } from '@ludiek/engine/output/OutputError';

it('is type-safe', () => {
  // Arrange
  const engine = new LudiekEngine({
    producers: [new EmptyProducer()],
  });

  // Valid
  engine.produce({ type: '/output/empty', amount: 2 });

  expect(() => {
    // @ts-expect-error unknown type
    engine.produce({ type: 'wrong' });
  }).toThrow(OutputNotFoundError);
});

it('it collapses to never when no output', () => {
  // Arrange
  const engine = new LudiekEngine({});

  expect(() => {
    // @ts-expect-error unknown type
    engine.produce({ type: 'wrong' });
  }).toThrow(OutputNotFoundError);
});
