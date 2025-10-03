import { beforeEach, describe, expect, it } from 'vitest';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { CurrencyConsumer } from '@ludiek/plugins/currency/CurrencyInput';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const currency = new CurrencyPlugin();
const consumer = new CurrencyConsumer();

new LudiekEngine({
  plugins: [currency],
  consumers: [consumer],
});

beforeEach(() => {
  currency.loadContent([{ id: '/currency/money' }, { id: '/currency/gems' }]);
});

describe('Currency Input', () => {
  it('checks if we can lose currency', () => {
    // Arrange
    currency.gainCurrency({ id: '/currency/money', amount: 3 });

    // Act
    const canLose3 = consumer.canLose({
      type: '/input/currency',
      id: '/currency/money',
      amount: 3,
    });
    const canLose4 = consumer.canLose({
      type: '/input/currency',
      id: '/currency/money',
      amount: 4,
    });

    // Assert
    expect(canLose3).toBe(true);
    expect(canLose4).toBe(false);
  });

  it('loses currency', () => {
    // Arrange
    currency.gainCurrency({ id: '/currency/money', amount: 3 });

    // Act
    consumer.lose({
      type: '/input/currency',
      id: '/currency/money',
      amount: 2,
    });
    const money = currency.getBalance('/currency/money');

    // Assert
    expect(money).toBe(1);
  });
});
