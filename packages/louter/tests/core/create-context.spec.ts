import { expect, it } from 'vitest';
import { createContext } from '@louter/core/util';
import { KindDefinitions } from '@louter/core/types';
import z from 'zod';

it('Creates a basic context', () => {
  // Arrange
  const kinds = {
    example: z.strictObject({
      id: z.string(),
      other: z.number(),
    }),
  } satisfies KindDefinitions;

  // Act
  const ctx = createContext(kinds);

  // Assert
  expect(ctx.kinds).toBe(kinds);
});

it('Initialises a content map per kind', () => {
  // Arrange
  const kinds = {
    example: z.strictObject({
      id: z.string(),
      other: z.number(),
    }),
  } satisfies KindDefinitions;

  // Act
  const ctx = createContext(kinds);

  // Assert
  expect(ctx.content.example).toStrictEqual({});
});
