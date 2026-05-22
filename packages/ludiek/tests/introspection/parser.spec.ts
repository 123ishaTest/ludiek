import { describe, expect, it } from 'vitest';

import z from 'zod';
import { parseZodSchema } from '@ludiek/introspection/ir/parsers';

describe('Basic parser', () => {
  it('parses strings', () => {
    // Arrange
    const schema = z.string().length(3);

    // Act
    const args = parseZodSchema(schema);

    // Assert
    expect(args).toStrictEqual({ kind: 'string', path: [], minLength: 3, maxLength: 3 });
  });

  it('parses numbers', () => {
    // Arrange
    const schema = z.number().min(4).max(8);

    // Act
    const args = parseZodSchema(schema);

    // Assert
    expect(args).toStrictEqual({ kind: 'number', path: [], minimum: 4, maximum: 8 });
  });

  it('parses integers', () => {
    // Arrange
    const schema = z.number().int();

    // Act
    const args = parseZodSchema(schema);

    // Assert
    expect(args).toStrictEqual({ kind: 'number', path: [], maximum: 9007199254740991, minimum: -9007199254740991 });
  });

  it('parses literals', () => {
    // Arrange
    const schema = z.literal('test-schema');

    // Act
    const args = parseZodSchema(schema);

    // Assert
    expect(args).toStrictEqual({
      path: [],
      default: 'test-schema',
      kind: 'literal',
      options: ['test-schema'],
    });
  });

  it('parses enums', () => {
    // Arrange
    const schema = z.enum(['a', 'b', 'c']);

    // Act
    const args = parseZodSchema(schema);

    // Assert
    expect(args).toStrictEqual({
      kind: 'string',
      path: [],
      options: ['a', 'b', 'c'],
    });
  });

  it('parses booleans', () => {
    // Arrange
    const schema = z.boolean();

    // Act
    const args = parseZodSchema(schema);

    // Assert
    expect(args).toStrictEqual({ kind: 'boolean', path: [] });
  });

  it('parses unknowns', () => {
    // Arrange
    const schema = z.unknown();

    // Act
    const args = parseZodSchema(schema);

    // Assert
    expect(args).toStrictEqual({ kind: 'unknown', path: [] });
  });

  it('parses optional fields', () => {
    // Arrange
    const schema = z.strictObject({
      id: z.string().optional(),
    });

    // Act
    const args = parseZodSchema(schema);

    // Assert
    expect(args).toStrictEqual({
      kind: 'object',
      strict: true,
      path: [],
      fields: [{ kind: 'string', path: ['id'] }],
    });
  });

  it('parses default fields', () => {
    // Arrange
    const schema = z.strictObject({
      value: z.number().default(4),
    });

    // Act
    const args = parseZodSchema(schema);

    // Assert
    expect(args).toStrictEqual({
      kind: 'object',
      strict: true,
      path: [],
      fields: [{ kind: 'number', path: ['value'], default: 4 }],
    });
  });

  it('Parses an object with strings', () => {
    // Arrange
    const schema = z.strictObject({
      id: z.string(),
      value: z.number().min(5),
    });

    // Act
    const representation = parseZodSchema(schema);

    // Assert
    expect(representation).toStrictEqual({
      kind: 'object',
      path: [],
      strict: true,
      fields: [
        {
          kind: 'string',
          path: ['id'],
          isRequired: true,
        },
        {
          kind: 'number',
          path: ['value'],

          minimum: 5,
          isRequired: true,
        },
      ],
    });
  });

  it('Parses a reference', () => {
    // Arrange
    const schema = z.strictObject({
      ref: z.string().meta({ ludiek: { reference: 'item' } }),
    });

    // Act
    const representation = parseZodSchema(schema);

    // Assert
    expect(representation).toStrictEqual({
      kind: 'object',
      path: [],
      strict: true,
      fields: [
        {
          kind: 'string',
          path: ['ref'],
          isRequired: true,
          ludiek: {
            reference: 'item',
          },
        },
      ],
    });
  });

  it('Parses a complex nested object', () => {
    // Arrange
    const schema = z.strictObject({
      test: z.array(
        z.strictObject({
          x: z.number(),
          y: z.record(z.string(), z.array(z.boolean())),
        }),
      ),
    });

    // Act
    const representation = parseZodSchema(schema);

    // Assert
    expect(representation).toStrictEqual({
      kind: 'object',
      path: [],
      strict: true,
      fields: [
        {
          kind: 'array',
          path: ['test'],
          items: {
            kind: 'object',
            isRequired: true,
            path: ['test', '*'],
            strict: true,
            fields: [
              {
                kind: 'number',
                path: ['test', '*', 'x'],
                isRequired: true,
              },
              {
                kind: 'record',
                path: ['test', '*', 'y'],

                keys: {
                  kind: 'string',
                  path: ['test', '*', 'y', '<key>'],
                },
                values: {
                  kind: 'array',
                  path: ['test', '*', 'y', '<value>'],

                  items: {
                    kind: 'boolean',
                    path: ['test', '*', 'y', '<value>', '*'],
                  },
                },
              },
            ],
          },
        },
      ],
    });
  });
});
