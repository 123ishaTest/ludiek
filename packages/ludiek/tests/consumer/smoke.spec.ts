import { expect, it } from 'vitest';
import { CurrencyPlugin, LudiekEngine, LudiekFeature, LudiekGame } from '@ludiek/index';

it('allows a consumer to create a basic game', () => {
  // Arrange
  const TICKS = 1000;

  type CurrencyId = 'money';
  const currency = new CurrencyPlugin([{ id: 'money' }]);

  const engine = new LudiekEngine({
    plugins: [currency],
  });
  type EngineAPI = typeof engine.plugins;

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

  expect(game.engine.plugins.currency.getBalance('money')).toBe(TICKS);
});

it('emits an event on tick', async () => {
  // Arrange
  expect.assertions(2);
  const game = new LudiekGame(new LudiekEngine({}), {});

  // Assert
  game.onTick.sub(() => {
    expect(true).toBeTruthy();
  });

  // Act
  game.start();
  await new Promise((resolve) => setTimeout(resolve, 2100));
});
