import { objectEquals } from '@ludiek/util/equality';
import { expect, it } from 'vitest';

it('compares identical objects', () => {
  // Arrange
  const a = { id: 'one', amount: 1 };
  const b = { id: 'one', amount: 1 };

  // Act
  const isEqual = objectEquals(a, b);

  // Assert
  expect(isEqual).toBe(true);
});

it('compares identical objects with differing amounts', () => {
  // Arrange
  const a = { id: 'one', amount: 1 };
  const b = { id: 'one', amount: 2 };

  // Act
  const isEqual = objectEquals(a, b);

  // Assert
  expect(isEqual).toBe(true);
});

it('compares identical objects with different values', () => {
  // Arrange
  const a = { id: 'one', amount: 1 };
  const b = { id: 'two', amount: 1 };

  // Act
  const isEqual = objectEquals(a, b);

  // Assert
  expect(isEqual).toBe(false);
});

it('compares identical objects with different keys', () => {
  // Arrange
  const a = { id: 'one', amount: 1 };
  const b = { name: 'one', amount: 1 };

  // Act
  const isEqual = objectEquals(a, b);

  // Assert
  expect(isEqual).toBe(false);
});

it('compares multiple keys', () => {
  // Arrange
  const a = { id: 'one', type: 'a', amount: 1 };
  const b = { id: 'one', type: 'b', amount: 1 };

  // Act
  const isEqual = objectEquals(a, b);

  // Assert
  expect(isEqual).toBe(false);
});
