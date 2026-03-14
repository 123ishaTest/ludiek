import { LouterFile } from '@louter/loader/LouterFile';
import { expect, it } from 'vitest';
import { getExtension, getKind } from '@louter/util/file';

it('Calculates file extensions', () => {
  // Arrange
  const file: LouterFile = { path: 'example.kind.ext', data: '' };

  // Act
  const extension = getExtension(file);

  // Assert
  expect(extension).toBe('ext');
});

it('Detects missing extensions', () => {
  // Arrange
  const file: LouterFile = { path: 'example', data: '' };

  // Act
  const extension = getExtension(file);

  // Assert
  expect(extension).toBeUndefined();
});

it('Calculates file kinds', () => {
  // Arrange
  const file: LouterFile = { path: 'example.kind.ext', data: '' };

  // Act
  const kind = getKind(file);

  // Assert
  expect(kind).toBe('kind');
});

it('Detects missing kinds', () => {
  // Arrange
  const file: LouterFile = { path: 'example.json', data: '' };

  // Act
  const kind = getKind(file);

  // Assert
  expect(kind).toBeUndefined();
});
