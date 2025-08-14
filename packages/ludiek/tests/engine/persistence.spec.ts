import { describe, expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

const engine = new LudiekEngine({
  plugins: [new CurrencyPlugin(), new StatisticPlugin()],
});
engine.plugins.currency.loadContent([{ id: 'money' }]);

const emptySave = {
  currency: {
    balances: {
      money: 0,
    },
  },
  statistic: {
    scalar: {},
    map: {},
  },
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
    expect(engine.plugins.currency.getBalance('money')).toBe(0);
  });

  it('loads a used plugin ', () => {
    // Act
    const money = 10;
    engine.load({
      currency: {
        balances: {
          money: money,
        },
      },
    });

    // Assert
    expect(engine.plugins.currency.getBalance('money')).toBe(money);
  });
});
