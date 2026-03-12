import { beforeEach, expect, it, vi } from 'vitest';
import { fs, vol } from 'memfs';
import { createContext } from '@louter/core/util';
import { LouterContentWriter } from '@louter/export/LouterContentWriter';
import { LouterWarningType } from '@louter/core/LouterWarningType';

// Mock fs everywhere else with the memfs version.
vi.mock('node:fs', () => ({ default: fs, ...fs }));
const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

beforeEach(() => {
  // reset the state of in-memory fs
  vol.reset();
  consoleMock.mockReset();
});

it('writes a big content file', () => {
  // Arrange
  const writer = new LouterContentWriter('generated');
  const ctx = createContext({});
  ctx.content = {
    example: { a: { id: 'a', number: 4 } },
    other: { b: { id: 'b', value: 2 } },
  };

  // Act
  writer.run(ctx);

  // Assert
  const result = fs.readFileSync('generated/content.generated.json', 'utf-8').toString();
  expect(JSON.parse(result)).toStrictEqual(ctx.content);
});

it('logs warnings', () => {
  // Arrange
  const writer = new LouterContentWriter('generated');
  const ctx = createContext({});
  ctx.warnings = [
    { path: 'example.kind.json', type: LouterWarningType.InvalidKind, message: 'Invalid kind' },
    { path: 'other.kind.yaml', type: LouterWarningType.InvalidYaml, message: 'Invalid yaml' },
  ];

  // Act
  writer.run(ctx);

  // Assert
  expect(consoleMock).toHaveBeenCalledTimes(2);
});
