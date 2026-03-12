import { beforeEach, expect, it, vi } from 'vitest';
import { fs, vol } from 'memfs';
import { createContext } from '@louter/core/util';
import { LouterJsonSchemaWriter } from '@louter/export/LouterJsonSchemaWriter';
import z from 'zod';

// Mock fs everywhere else with the memfs version.
vi.mock('node:fs', () => ({ default: fs, ...fs }));
const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

beforeEach(() => {
  // reset the state of in-memory fs
  vol.reset();
  consoleMock.mockReset();
});

it('writes all schemas', () => {
  // Arrange
  const writer = new LouterJsonSchemaWriter('generated');
  const ExampleSchema = z.strictObject({ id: z.string() });
  const OtherSchema = z.strictObject({ id: z.string(), other: z.number() });
  const ctx = createContext({
    example: ExampleSchema,
    other: OtherSchema,
  });

  // Act
  writer.run(ctx);

  // Assert
  const exampleSchema = fs.readFileSync('generated/example.schema.json', 'utf-8').toString();
  expect(JSON.parse(exampleSchema)).toStrictEqual(ExampleSchema.toJSONSchema());

  const otherSchema = fs.readFileSync('generated/other.schema.json', 'utf-8').toString();
  expect(JSON.parse(otherSchema)).toStrictEqual(OtherSchema.toJSONSchema());
});
