import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { DummyModifier } from '@tests/shared/DummyBonus';
import { ModifierNotFoundError } from '@ludiek/engine/modifier/ModifierError';
import { AdditiveModifier } from '@tests/shared/AdditiveBonus';
import { EmptyPlugin } from '@tests/shared/EmptyPlugin';
import { MultiplicativeModifier } from '@tests/shared/MultiplicativeBonus';

beforeEach(() => {
  vi.resetAllMocks();
});

describe('Engine Bonuses', () => {
  it('registers provided modifiers', () => {
    // Arrange
    const modifiers = [new DummyModifier()];

    // Act
    const engine = new LudiekEngine({
      modifiers: modifiers,
    });
    const registeredModifiers = engine.modifiers;

    // Assert
    expect(registeredModifiers).toEqual(modifiers);
  });

  it('uses defaults when bonuses are missing', () => {
    // Arrange
    const emptyPlugin = new EmptyPlugin();
    const additiveModifier = new AdditiveModifier();
    const multiplicativeModifier = new MultiplicativeModifier();

    const engine = new LudiekEngine({
      plugins: [emptyPlugin],
      modifiers: [additiveModifier, multiplicativeModifier],
    });
    engine.preTick();

    // Act
    const additiveBonus = engine.getBonus({ type: '/bonus/additive' });
    const multiplicativeBonus = engine.getBonus({ type: '/bonus/multiplicative' });

    // Assert
    expect(additiveBonus).toBe(additiveModifier.default);
    expect(multiplicativeBonus).toBe(multiplicativeModifier.default);
  });

  it('calculates additive bonuses', () => {
    // Arrange
    const emptyPlugin = new EmptyPlugin();
    vi.spyOn(emptyPlugin, 'getBonuses').mockReturnValue([
      { type: '/bonus/additive', amount: +1 },
      { type: '/bonus/additive', amount: +2 },
    ]);

    const engine = new LudiekEngine({
      plugins: [emptyPlugin],
      modifiers: [new AdditiveModifier()],
    });
    engine.preTick();

    // Act
    const bonus = engine.getBonus({ type: '/bonus/additive' });

    // Assert
    expect(bonus).toBe(3);
  });

  it('calculates multiplicative bonuses', () => {
    // Arrange
    const emptyPlugin = new EmptyPlugin();
    vi.spyOn(emptyPlugin, 'getBonuses').mockReturnValue([
      { type: '/bonus/multiplicative', amount: +0.1 },
      { type: '/bonus/multiplicative', amount: +0.2 },
    ]);

    const engine = new LudiekEngine({
      plugins: [emptyPlugin],
      modifiers: [new MultiplicativeModifier()],
    });
    engine.preTick();

    // Act
    const bonus = engine.getBonus({ type: '/bonus/multiplicative' });

    // Assert
    expect(bonus).toBe(1.32);
  });

  it('errors when a modifier does not exist', () => {
    // Arrange
    const engine = new LudiekEngine({});

    // Act
    expect(() => {
      // @ts-expect-error unknown type
      engine.getBonus({ type: 'wrong' });
    }).toThrow(ModifierNotFoundError);
  });
});
