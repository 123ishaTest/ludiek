import { describe, expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

const engine = new LudiekEngine({
  plugins: [new CurrencyPlugin(), new StatisticPlugin()],
});
engine.plugins.currency.loadContent([{ id: '/currency/money' }]);

const emptySave = {
  plugins: {
    currency: {
      balances: {
        '/currency/money': 0,
      },
    },
    statistic: {
      scalar: {},
      map: {},
    },
  },
  features: {},
};

describe('Persistence', () => {
  it('creates an empty save structure', () => {
    // Arrange
    const expectedShape = emptySave;

    // Act
    const save = engine.save();

    // Assert
    expect(save).toStrictEqual(expectedShape);
  });

  it('loads an empty save structure', () => {
    // Act
    engine.load(emptySave);

    // Assert
    expect(engine.plugins.currency.getBalance('/currency/money')).toBe(0);
  });

  it('loads a used plugin ', () => {
    // Act
    const money = 10;
    engine.load({
      plugins: {
        currency: {
          balances: {
            '/currency/money': money,
          },
        },
      },
      features: {},
    });

    // Assert
    expect(engine.plugins.currency.getBalance('/currency/money')).toBe(money);
  });
});
