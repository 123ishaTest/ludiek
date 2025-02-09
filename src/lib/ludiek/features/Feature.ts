import type { Saveable } from '$lib/ludiek/tools/saving/Saveable';
import type { SaveData } from '$lib/ludiek/tools/saving/SaveData';
import type { Features } from '$lib/ludiek/features/Features';
import type { Engine } from '$lib/ludiek/engine/Engine';
import type { Requirement } from '$lib/ludiek/engine/concepts/requirements/RequirementSchema';
import type { Content } from '$lib/ludiek/content/Content';

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
  private _features!: Features;
  private _engine!: Engine;
  private _content!: Content;

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
   * This is where your main configuration takes place.
   * Hook into other features events here
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

  abstract load(data: Partial<SaveData>): void;

  abstract save(): SaveData;
}
