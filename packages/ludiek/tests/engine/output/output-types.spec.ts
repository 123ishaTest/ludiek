import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { EmptyOutput } from '@tests/shared/EmptyOutput';
import { OutputNotFoundError } from '@ludiek/engine/output/OutputError';

it('is type-safe', () => {
  // Arrange
  const engine = new LudiekEngine({
    producers: [new EmptyOutput()],
  });

  // Valid
  engine.gainOutput({ type: '/output/empty', amount: 2 });

  expect(() => {
    // @ts-expect-error unknown type
    engine.gainOutput({ type: 'wrong' });
  }).toThrow(OutputNotFoundError);
});

it('it collapses to never when no output', () => {
  // Arrange
  const engine = new LudiekEngine({});

  expect(() => {
    // @ts-expect-error unknown type
    engine.gainOutput({ type: 'wrong' });
  }).toThrow(OutputNotFoundError);
});
