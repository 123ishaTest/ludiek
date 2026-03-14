import { expect, it } from 'vitest';
import { createContext } from '@louter/core/util';
import { LouterJsonParser } from '@louter/parser/LouterJsonParser';
import { LouterWarningType } from '@louter/core/LouterWarningType';

it('parses JSON files', () => {
  // Arrange
  const parser = new LouterJsonParser();
  const ctx = createContext({});
  ctx.files = [
    { path: 'a.example.json', data: '{"id": "a"}' },
    { path: 'b.dummy.json', data: '{"id": "b", "prop": 4}' },
  ];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toStrictEqual([]);
  expect(ctx.objects).toStrictEqual([
    {
      data: { id: 'a' },
      kind: 'example',
      path: 'a.example.json',
    },
    {
      data: { id: 'b', prop: 4 },
      kind: 'dummy',
      path: 'b.dummy.json',
    },
  ]);
});

it('skips non-json files', () => {
  // Arrange
  const parser = new LouterJsonParser();
  const ctx = createContext({});
  ctx.files = [
    { path: 'a.example.non-json', data: '{"id": "a"}' },
    { path: 'b.dummy.json', data: '{"id": "b", "prop": 4}' },
  ];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toStrictEqual([]);
  expect(ctx.objects).toHaveLength(1);
});

it('adds a warning on missing kinds', () => {
  // Arrange
  const parser = new LouterJsonParser();
  const ctx = createContext({});
  ctx.files = [{ path: 'a.json', data: '{"id": "a"}' }];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toHaveLength(1);
  expect(ctx.warnings[0].type).toBe(LouterWarningType.MissingKind);
  expect(ctx.objects).toHaveLength(0);
});

it('adds a warning on invalid json', () => {
  // Arrange
  const parser = new LouterJsonParser();
  const ctx = createContext({});
  ctx.files = [{ path: 'a.kind.json', data: '?' }];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toHaveLength(1);
  expect(ctx.warnings[0].type).toBe(LouterWarningType.InvalidJson);
  expect(ctx.objects).toHaveLength(0);
});
