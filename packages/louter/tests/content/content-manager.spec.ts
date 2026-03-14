import { expect, it } from 'vitest';
import { ContentManager } from '@louter/content/ContentManager';
import z from 'zod';
import { ContentKindNotFoundError, ContentNotFoundError } from '@louter/core/LouterError';

it('can load content', () => {
  // Arrange
  const exampleA = { id: 'a', amount: 4 };
  const exampleB = { id: 'b', amount: 4 };
  const exampleContent = { a: exampleA, b: exampleB };

  const manager = new ContentManager({
    example: z.strictObject({
      id: z.string(),
      amount: z.number(),
    }),
  });

  // Act
  manager.load({
    example: exampleContent,
  });
  const content = manager.getMap('example');

  // Assert
  expect(content).toStrictEqual(exampleContent);
});

it('can get individual pieces of content', () => {
  // Arrange
  const exampleA = { id: 'a', amount: 4 };

  const manager = new ContentManager({
    example: z.strictObject({
      id: z.string(),
      amount: z.number(),
    }),
  });

  // Act
  manager.loadKind('example', [exampleA]);
  const content = manager.get(exampleA.id, 'example');

  // Assert
  expect(content).toStrictEqual(exampleA);
});

it('throws an error when a kind does not exist', () => {
  // Arrange
  const manager = new ContentManager({});

  // Act
  expect(() => {
    // @ts-expect-error wrong kind
    manager.getMap('wrong');
  }).toThrow(ContentKindNotFoundError);

  expect(() => {
    // @ts-expect-error wrong kind
    manager.getList('wrong');
  }).toThrow(ContentKindNotFoundError);
});

it('throws an error when a piece of content does not exist', () => {
  // Arrange
  const manager = new ContentManager({
    example: z.strictObject({
      id: z.string(),
      amount: z.number(),
    }),
  });

  // Act
  expect(() => {
    manager.get('wrong', 'example');
  }).toThrow(ContentNotFoundError);
});
