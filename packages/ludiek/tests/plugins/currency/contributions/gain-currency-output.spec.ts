import { beforeEach, describe, expect, it } from 'vitest';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { GainCurrencyProducer } from '@ludiek/plugins/currency/contributions/GainCurrencyOutput';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const currency = new CurrencyPlugin();
const producer = new GainCurrencyProducer();

new LudiekEngine({
  plugins: [currency],
  producers: [producer],
});

beforeEach(() => {
  currency.loadContent([{ id: '/currency/money' }, { id: '/currency/gems' }]);
});

describe('Currency Output', () => {
  it('checks if we can gain currency', () => {
    // Act
    const canProduce = producer.canProduce();

    // Assert
    expect(canProduce).toBe(true);
  });

  it('gains currency', () => {
    // Act
    producer.produce({
      type: '/output/gain-currency',
      id: '/currency/money',
      amount: 6,
    });
    const money = currency.getBalance('/currency/money');

    // Assert
    expect(money).toBe(6);
  });
});
