import { expect, it } from 'vitest';
import z from 'zod';
import { replaceSchema } from '@ludiek/util/schema';
import { l } from '@ludiek/engine/LudiekContent';

it('replaces schemas', () => {
  // Arrange
  const baseSchema = z.strictObject({
    a: l.condition(),
    b: z.string(),
    c: l.condition(),
  });

  const search = l.condition();
  const replace = z.string();

  // Act
  const resultSchema = replaceSchema(baseSchema, search, replace);

  const data = resultSchema.safeParse({
    a: 'a',
    b: 'a',
    c: 'a',
  });

  // Assert
  expect(data.success).toStrictEqual(true);
});
