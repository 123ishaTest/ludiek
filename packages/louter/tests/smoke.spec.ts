import { expect, it } from 'vitest';
import { Louter } from '@louter/core/Louter';
import { LouterFileLoader } from '@louter/loader/LouterFileLoader';
import { LouterYamlParser } from '@louter/parser/LouterYamlParser';
import { LouterValidator } from '@louter/validator/LouterValidator';
import { CurrencySchema } from '@tests/mock/model/Currency';
import { UpgradeSchema } from '@tests/mock/model/Upgrade';

it('performs a full pipeline', () => {
  // Arrange
  const louter = new Louter([
    new LouterFileLoader('tests/mock/content'),
    new LouterYamlParser(),
    new LouterValidator(),
  ]);

  // Act
  const result = louter.run({
    currency: CurrencySchema,
    upgrade: UpgradeSchema,
  });

  // Assert
  expect(result.warnings).toStrictEqual([]);
  expect(Object.entries(result.content)).toHaveLength(2);
});
