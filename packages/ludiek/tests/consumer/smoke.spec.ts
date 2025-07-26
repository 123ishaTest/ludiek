import { expect, it } from 'vitest';
import { CurrencyPlugin, LudiekEngine, LudiekFeature, LudiekGame } from '@ludiek/index';

it('allows a consumer to create a basic game', () => {
  // Arrange
  const TICKS = 1000;

  type CurrencyId = 'money';
  const currency = new CurrencyPlugin([{ id: 'money' }]);

  const engine = new LudiekEngine({
    currency: currency,
  });
  type EngineAPI = typeof engine.api;

  class DummyFeature extends LudiekFeature<EngineAPI> {
    name: string = 'dummy';

    private _currency: CurrencyPlugin<CurrencyId>;

    constructor(currency: CurrencyPlugin<CurrencyId>) {
      super();
      this._currency = currency;
    }

    update() {
      this._currency.gainCurrency({ id: 'money', amount: 1 });
    }
  }

  const game = new LudiekGame(engine, {
    dummy: new DummyFeature(currency),
  });

  // Act
  for (let i = 0; i < TICKS; i++) {
    game.tick(1);
  }

  expect(game.engine.api.currency.getBalance('money')).toBe(TICKS);
});
