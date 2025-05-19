import type { Saveable } from '#ludiek/tools/saving/Saveable';
import type { Features } from '#ludiek/features/Features';
import type { Engine } from '#ludiek/engine/Engine';
import type { Content } from '#ludiek/content/Content';
import type { Requirement } from '#ludiek/engine/concepts/requirements/Requirement';
import type { SaveData } from '#ludiek/tools/saving/SaveData';
import type { EngineContribution } from '#ludiek/engine/EngineContribution';

/**
 * An abstract class that all features should extend from.
 *
 * The lifecycle of a feature:
 * - On game creation, all other game features are injected into this game.
 * - On initialize, the feature can subscribe to events from other features.
 * - On load, the feature can apply data to load game state.
 * - On tick, the feature gets updated with a time delta.
 * - On save, the features returns data to store game state,
 */
export abstract class Feature implements Saveable {
  /**
   * All game features
   * @private
   */
  protected _features!: Features;
  protected _engine!: Engine;
  protected _content!: Content;

  /**
   * Variable which contains the state of a feature.
   * @protected
   */
  protected abstract _state: object;

  /**
   * Initialize all feature attributes.
   * Note that you should not assume other features exist already here
   * @param saveKey The key that this feature should save to. Override if you have multiple of the same features
   */
  protected constructor(saveKey: string) {
    this.saveKey = saveKey;
  }

  /**
   * Called by the engine to inject features.
   * @internal
   * @param features All Features from your game.
   * @param content All Content repositories.
   * @param engine The engine.
   */
  public _inject(features: Features, engine: Engine, content: Content) {
    this._features = features;
    this._engine = engine;
    this._content = content;
  }

  /**
   * This is where your engine configuration takes place.
   * Add definitions to engine concepts here.
   */
  public getEngineContribution?(): EngineContribution;

  /**
   * This is where your feature configuration takes place.
   * Hook into other features events here.
   */
  initialize?(): void;

  /**
   * Gets called every Game.TICK_DURATION
   * @param delta time since last update
   */
  update?(delta: number): void;

  // Engine helper methods
  protected hasRequirement(requirement: Requirement): boolean {
    return this._engine.hasRequirement(requirement);
  }

  // Saving logic
  saveKey: string;

  public load(data: Partial<SaveData>): void {
    // TODO(@Isha): Deep merge? Versioning?
    // this._state = { ...this._state, ...data };
    Object.keys(data).forEach((key: string) => {
      // @ts-expect-error generic loading of data
      this._state[key] = data[key];
    });
  }

  public save(): SaveData {
    return this._state;
  }
}
