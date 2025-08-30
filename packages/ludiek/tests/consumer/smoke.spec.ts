import { beforeEach, expect, it } from 'vitest';
import { CurrencyPlugin, LudiekEngine, LudiekFeature, LudiekGame } from '@ludiek/index';
import { LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';

class DummyFeature extends LudiekFeature<never> {
  name = 'dummy';
  public controllers = [];

  protected _state = {
    xp: 0,
  };

  private _currency: CurrencyPlugin;

  constructor(currency: CurrencyPlugin) {
    super();
    this._currency = currency;
  }

  update() {
    this._state.xp++;
    this._currency.gainCurrency({ id: 'money', amount: 1 });
  }

  public getXp(): number {
    return this._state.xp;
  }
}

const createGame = () => {
  const currency = new CurrencyPlugin();

  const engine = new LudiekEngine({
    plugins: [currency],
  });
  currency.loadContent([{ id: 'money' }]);

  return new LudiekGame(engine, {
    features: [new DummyFeature(currency)],
    saveKey: 'dummy-game',
    saveInterval: 30,
    tickDuration: 1,
  });
};

let game = createGame();

beforeEach(() => {
  game = createGame();
});

it('allows a consumer to create a basic game', () => {
  // Arrange
  const TICKS = 1000;

  // Act
  for (let i = 0; i < TICKS; i++) {
    game.tick(1);
  }

  // Assert
  expect(game.engine.plugins.currency.getBalance('money')).toBe(TICKS);
});

it('saves features and plugins', () => {
  // Arrange
  const TICKS = 1000;

  // Act
  for (let i = 0; i < TICKS; i++) {
    game.tick(1);
  }
  const save = game.save();

  // Assert
  expect(save).toStrictEqual({
    engine: { currency: { balances: { money: 1000 } } },
    features: { dummy: { xp: 1000 } },
  });
});

it('loads features and plugins', () => {
  // Arrange
  const save: LudiekSaveData = {
    engine: { currency: { balances: { money: 300 } } },
    features: { dummy: { xp: 400 } },
  };

  // Act
  game.load(save);
  const money = game.engine.plugins.currency.getBalance('money');
  const xp = game.features.dummy.getXp();

  // Assert
  expect(money).toBe(300);
  expect(xp).toBe(400);
});

it('emits an event on tick', async () => {
  // Arrange
  expect.assertions(2);

  // Assert
  game.onTick.sub(() => {
    expect(true).toBeTruthy();
  });

  // Act
  game.start();
  await new Promise((resolve) => setTimeout(resolve, 2100));
});
