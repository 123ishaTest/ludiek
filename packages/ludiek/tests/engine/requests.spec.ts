import { BaseRequestShape, LudiekController } from '@ludiek/engine/requests/LudiekRequest';
import { LudiekGame } from '@ludiek/engine/LudiekGame';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { beforeEach, expect, it } from 'vitest';
import { ControllerNotFoundError } from '@ludiek/engine/LudiekError';
import { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';

interface DummyRequest extends BaseRequestShape {
  type: 'dummy';
  amount: number;
}

class DummyFeature extends LudiekFeature<never> {
  readonly name = 'dummy';
  protected _state = {
    xp: 0,
  };
  public controllers = [new DummyController(this)];

  gainXp(amount: number): void {
    this._state.xp += amount;
  }

  public get xp(): number {
    return this._state.xp;
  }
}

class DummyController implements LudiekController<DummyRequest> {
  type = 'dummy';

  constructor(private readonly _dummy: DummyFeature) {}

  resolve(request: DummyRequest) {
    this._dummy.gainXp(request.amount);
  }
}

const createGame = () => {
  return new LudiekGame(
    new LudiekEngine({
      plugins: [new CouponPlugin()],
    }),
    {
      features: [new DummyFeature()],
      saveInterval: 30,
      saveKey: '/test',
      tickDuration: 1,
    },
  );
};

let game = createGame();

beforeEach(() => {
  game = createGame();
});

it('resolves requests', () => {
  // Act
  game.request({
    type: 'dummy',
    amount: 10,
  });

  // Assert
  expect(game.features.dummy.xp).toBe(10);
});

it('keeps track of requests in a history', () => {
  // Act
  game.request({ type: 'dummy', amount: 1 });
  game.request({ type: 'dummy', amount: 10 });

  // Assert
  expect(game.requestHistory.events.length).toBe(2);
});

it('throws an error when performing an unknown request', () => {
  // Assert
  expect(() => {
    // @ts-expect-error wrong is not a known request type
    game.request({ type: 'wrong' });
  }).toThrow(ControllerNotFoundError);
});
