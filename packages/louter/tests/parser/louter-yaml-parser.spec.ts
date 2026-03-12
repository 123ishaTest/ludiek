import { expect, it } from 'vitest';
import { createContext } from '@louter/core/util';
import { LouterYamlParser } from '@louter/parser/LouterYamlParser';
import { LouterWarningType } from '@louter/core/LouterWarningType';

it('parses YAML files', () => {
  // Arrange
  const parser = new LouterYamlParser();
  const ctx = createContext({});
  ctx.files = [
    { path: 'a.example.yaml', data: 'id: a' },
    { path: 'b.dummy.yaml', data: 'id: b\nprop: 4' },
  ];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toStrictEqual([]);
  expect(ctx.objects).toStrictEqual([
    {
      data: { id: 'a' },
      kind: 'example',
      path: 'a.example.yaml',
    },
    {
      data: { id: 'b', prop: 4 },
      kind: 'dummy',
      path: 'b.dummy.yaml',
    },
  ]);
});

it('skips non-yaml files', () => {
  // Arrange
  const parser = new LouterYamlParser();
  const ctx = createContext({});
  ctx.files = [
    { path: 'a.example.non-yaml', data: 'id: a' },
    { path: 'b.dummy.yaml', data: 'id: b\nprop: 4' },
  ];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toStrictEqual([]);
  expect(ctx.objects).toHaveLength(1);
});

it('adds a warning on missing kinds', () => {
  // Arrange
  const parser = new LouterYamlParser();
  const ctx = createContext({});
  ctx.files = [{ path: 'a.yaml', data: 'id: a' }];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toHaveLength(1);
  expect(ctx.warnings[0].type).toBe(LouterWarningType.MissingKind);
  expect(ctx.objects).toHaveLength(0);
});

it('adds a warning on invalid yaml', () => {
  // Arrange
  const parser = new LouterYamlParser();
  const ctx = createContext({});
  ctx.files = [{ path: 'a.kind.yaml', data: 'a:\na' }];

  // Act
  parser.run(ctx);

  // Assert
  expect(ctx.warnings).toHaveLength(1);
  expect(ctx.warnings[0].type).toBe(LouterWarningType.InvalidYaml);
  expect(ctx.objects).toHaveLength(0);
});
