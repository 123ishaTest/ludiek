import { expect, it } from 'vitest';
import { LouterFileLoader } from '@louter/loader/LouterFileLoader';
import { createContext } from '@louter/core/util';

it('loads files', () => {
  // Arrange
  const loader = new LouterFileLoader('tests/mock/content');
  const ctx = createContext({});

  // Act
  loader.run(ctx);

  // Assert
  expect(ctx.objects).toHaveLength(0);
  expect(ctx.files).toHaveLength(2);
});
