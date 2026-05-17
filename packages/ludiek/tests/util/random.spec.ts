import { expect, it, describe } from 'vitest';
import { roundom } from '@ludiek/util/probability/random';

describe('Roundom', () => {
  it('never exceeds the range', () => {
    // Arrange
    const TRIALS = 1000;

    // Act
    for (let i = 0; i < TRIALS; i++) {
      const value = roundom(5.5);
      expect(value).toBeOneOf([5, 6]);
    }
  });

  it("doesn't do anything on whole numbers", () => {
    // Arrange
    const TRIALS = 1000;

    // Act
    for (let i = 0; i < TRIALS; i++) {
      const value = roundom(4);
      expect(value).toBe(4);
    }
  });
});
