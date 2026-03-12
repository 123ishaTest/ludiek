import { expect, it } from 'vitest';
import z from 'zod';
import { createContext } from '@louter/core/util';
import { LouterValidator } from '@louter/validator/LouterValidator';
import { LouterWarningType } from '@louter/core/LouterWarningType';

it('validates objects', () => {
  // Arrange
  const parser = new LouterValidator();
  const ctx = createContext({
    example: z.strictObject({
      id: z.string(),
      other: z.number(),
    }),
    dummy: z.strictObject({
      id: z.string(),
      prop: z.string(),
    }),
  });
  const examplePiece = { id: 'a', other: 4 };
  const dummyPiece = { id: 'b', prop: 'prop' };
  ctx.objects = [
    { path: 'a.example.json', kind: 'example', data: examplePiece },
    { path: 'b.dummy.json', kind: 'dummy', data: dummyPiece },
  ];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toStrictEqual([]);
  expect(ctx.content.example.a).toStrictEqual(examplePiece);
  expect(ctx.content.dummy.b).toStrictEqual(dummyPiece);
});

it('adds a warning for an invalid kind', () => {
  const parser = new LouterValidator();
  const ctx = createContext({
    example: z.strictObject({ id: z.string(), other: z.number() }),
  });
  ctx.objects = [{ path: 'a.invalid.json', kind: 'invalid', data: { id: 'a', other: 4 } }];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toHaveLength(1);
  expect(ctx.warnings[0].type).toBe(LouterWarningType.InvalidKind);
  expect(ctx.content).toStrictEqual({ example: {} });
});

it('adds a warning when zod cannot parse', () => {
  const parser = new LouterValidator();
  const ctx = createContext({
    example: z.strictObject({ id: z.string(), other: z.number() }),
  });
  ctx.objects = [{ path: 'a.example.json', kind: 'example', data: { id: 'a' } }];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toHaveLength(1);
  expect(ctx.warnings[0].type).toBe(LouterWarningType.ZodParsingFailed);
  expect(ctx.content).toStrictEqual({ example: {} });
});

it('adds a warning when an id is missing', () => {
  const parser = new LouterValidator();
  const ctx = createContext({
    example: z.strictObject({ id: z.string(), other: z.number() }),
  });
  ctx.objects = [{ path: 'a.example.json', kind: 'example', data: { other: 4 } }];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toHaveLength(1);
  expect(ctx.warnings[0].type).toBe(LouterWarningType.MissingGlobalIdKey);
  expect(ctx.content).toStrictEqual({ example: {} });
});

it('adds a warning when an id is duplicated', () => {
  const parser = new LouterValidator();
  const ctx = createContext({
    example: z.strictObject({ id: z.string(), other: z.number() }),
  });
  const first = { id: 'a', other: 4 };
  ctx.objects = [
    { path: 'a.example.json', kind: 'example', data: first },
    { path: 'b.example.json', kind: 'example', data: { id: 'a', other: 5 } },
  ];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toHaveLength(1);
  expect(ctx.warnings[0].type).toBe(LouterWarningType.DuplicateId);
  expect(ctx.content.example.a).toStrictEqual(first);
});
