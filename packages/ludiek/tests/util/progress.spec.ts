import { progress } from '@ludiek/util/progress';
import { expect, it } from 'vitest';

it('calculates the percentage', () => {
  // Act
  const actualProgress = progress(5, 10);

  // Assert
  expect(actualProgress.current).toBe(5);
  expect(actualProgress.target).toBe(10);
  expect(actualProgress.percentage).toBe(0.5);
});
