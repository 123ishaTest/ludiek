import { describe, expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekIntrospector } from '@ludiek/introspection/LudiekIntrospector';
import z from 'zod';
import { AdditiveModifier } from '@tests/shared/AdditiveBonus';
import { TrueEvaluator } from '@ludiek/stdlib';
import { AlwaysConsumer } from '@tests/shared/AlwaysInput';
import { AlwaysProducer } from '@tests/shared/AlwaysOutput';
import { MultiArgumentController } from '@tests/shared/MultiArgumentRequest';
import { l } from '@ludiek/engine/LudiekContent';
import { MultiplicativeModifier } from '@tests/shared/MultiplicativeBonus';
import { EmptyController } from '@tests/shared/EmptyRequest';
import { EmptyPlugin } from '@tests/shared/EmptyPlugin';

const Height = 10;
export const IsOnGround = () => Height < 0;

describe('Ludiek Introspector', () => {
  it('can do a full engine introspection', () => {
    // Arrange
    const engine = new LudiekEngine({
      plugins: [new EmptyPlugin()],
      evaluators: [new TrueEvaluator()],
      consumers: [new AlwaysConsumer()],
      producers: [new AlwaysProducer()],
      controllers: [new EmptyController()],
      modifiers: [new MultiplicativeModifier()],
      content: [{ kind: 'item', schema: z.strictObject({ id: z.string() }) }],
    });
    const introspector = new LudiekIntrospector(engine);

    // Act
    const introspection = introspector.introspect();

    // Assert
    expect(introspection).toStrictEqual({
      features: { features: [] },
      plugins: { plugins: [{ content: [], type: 'empty' }] },
      content: { kinds: [{ items: [], kind: 'item', nodes: [{ isRequired: true, kind: 'string', path: ['id'] }] }] },

      condition: { commands: [{ command: '/condition/true', arguments: [] }] },
      input: {
        commands: [{ command: '/input/always', arguments: [{ field: 'amount', options: [], type: 'number' }] }],
      },
      output: {
        commands: [{ command: '/output/always', arguments: [{ field: 'amount', options: [], type: 'number' }] }],
      },
      request: { commands: [{ arguments: [], command: '/request/empty' }] },
      bonus: { commands: [{ command: '/bonus/multiplicative', arguments: [] }] },
    });
  });

  it('can do a content introspection', () => {
    // Arrange
    const engine = new LudiekEngine({
      content: [{ kind: 'item', schema: z.strictObject({ id: z.string(), value: z.number() }) }],
    });
    const item = {
      id: 'item-1',
      value: 4,
    };
    engine.contentManager.loadKind('item', [item]);
    const introspector = new LudiekIntrospector(engine);

    // Act
    const introspection = introspector.getContent();

    // Assert
    expect(introspection).toStrictEqual({
      kinds: [
        {
          items: [item],
          kind: 'item',
          nodes: [
            {
              isRequired: true,
              kind: 'string',
              path: ['id'],
            },
            {
              isRequired: true,
              kind: 'number',
              path: ['value'],
            },
          ],
        },
      ],
    });
  });

  it('it can handle content references', () => {
    // Arrange
    const engine = new LudiekEngine({
      content: [{ kind: 'item', schema: z.strictObject({ id: z.string(), value: l.reference('item') }) }],
    });
    const item = {
      id: 'item-1',
      value: 'item-1',
    };
    engine.contentManager.loadKind('item', [item]);
    const introspector = new LudiekIntrospector(engine);

    // Act
    const introspection = introspector.getContent();

    // Assert
    expect(introspection).toStrictEqual({
      kinds: [
        {
          items: [item],
          kind: 'item',
          nodes: [
            {
              isRequired: true,
              kind: 'string',
              path: ['id'],
            },
            {
              isRequired: true,
              kind: 'string',
              ludiek: {
                reference: 'item',
              },
              path: ['value'],
            },
          ],
        },
      ],
    });
  });

  it('cannot introspect non object content', () => {
    // Arrange
    const engine = new LudiekEngine({
      // @ts-expect-error missing {id: string}
      content: [{ kind: 'item', schema: z.string() }],
    });
    const introspector = new LudiekIntrospector(engine);

    // Act
    const introspection = introspector.getContent();

    // Assert
    expect(introspection.kinds).toHaveLength(0);
  });

  it('can do a condition introspection', () => {
    // Arrange
    const engine = new LudiekEngine({
      evaluators: [new TrueEvaluator()],
    });
    const introspector = new LudiekIntrospector(engine);

    // Act
    const introspection = introspector.getCondition();

    // Assert
    expect(introspection).toStrictEqual({
      commands: [
        {
          command: '/condition/true',
          arguments: [],
        },
      ],
    });
  });

  it('can do an input introspection', () => {
    // Arrange
    const engine = new LudiekEngine({
      consumers: [new AlwaysConsumer()],
    });
    const introspector = new LudiekIntrospector(engine);

    // Act
    const introspection = introspector.getInput();

    // Assert
    expect(introspection).toStrictEqual({
      commands: [
        {
          command: '/input/always',
          arguments: [{ field: 'amount', options: [], type: 'number' }],
        },
      ],
    });
  });

  it('can do an output introspection', () => {
    // Arrange
    const engine = new LudiekEngine({
      producers: [new AlwaysProducer()],
    });
    const introspector = new LudiekIntrospector(engine);

    // Act
    const introspection = introspector.getOutput();

    // Assert
    expect(introspection).toStrictEqual({
      commands: [
        {
          command: '/output/always',
          arguments: [{ field: 'amount', options: [], type: 'number' }],
        },
      ],
    });
  });

  it('can do a request introspection', () => {
    // Arrange
    const engine = new LudiekEngine({
      controllers: [new MultiArgumentController()],
    });
    const introspector = new LudiekIntrospector(engine);

    // Act
    const introspection = introspector.getRequest();

    // Assert
    expect(introspection).toStrictEqual({
      commands: [
        {
          command: '/request/multi-argument',
          arguments: [
            { field: 'first', options: [], type: 'string' },
            { field: 'second', options: [], type: 'number' },
          ],
        },
      ],
    });
  });

  it('can do a bonus introspection', () => {
    // Arrange
    const engine = new LudiekEngine({
      modifiers: [new AdditiveModifier()],
    });
    const introspector = new LudiekIntrospector(engine);

    // Act
    const introspection = introspector.getBonus();

    // Assert
    expect(introspection).toStrictEqual({
      commands: [
        {
          command: '/bonus/additive',
          arguments: [],
        },
      ],
    });
  });
});
