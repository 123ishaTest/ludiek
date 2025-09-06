import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

export interface BaseRequestShape {
  type: string;
}

export interface LudiekController<Request extends BaseRequestShape = BaseRequestShape> {
  type: string;

  // TODO(@Isha): LudiekResponse object?
  resolve(request: Request): void;
}

export interface RequestEvent {
  timestamp: Date;
  request: BaseRequestShape;
}

/**
 * Given a tuple of LudiekControllers, produce a union of their request shapes.
 */
export type RequestShape<Controllers extends LudiekController[]> =
  Controllers[number] extends LudiekController<infer Shape> ? Shape : never;

/**
 * Extract the list of controllers from a plugin's config, or [] if none.
 */
export type PluginControllers<T extends LudiekPlugin> = T extends { config: { controllers: infer C } } ? C : never[];

/**
 * Given a list of plugins, produce the union of all their controller classes.
 * If no plugins or no controllers, returns [].
 */
export type PluginControllerList<Plugins extends LudiekPlugin[] | undefined = undefined> = Plugins extends undefined
  ? []
  : PluginControllers<NonNullable<Plugins>[number]> extends never[]
    ? []
    : PluginControllers<NonNullable<Plugins>[number]>;

/**
 * Combine plugin‑provided controllers and engine‑provided controllers into a single tuple.
 */
export type EngineControllers<
  Plugins extends LudiekPlugin[] | undefined,
  Controllers extends LudiekController[] | undefined,
> = [...PluginControllerList<Plugins>, ...(Controllers extends undefined ? [] : NonNullable<Controllers>)];

/**
 * Build the union of all available controller shapes for the engine.
 * Collapses to `never` if there are no controllers at all.
 */
export type EngineRequestShape<
  Plugins extends LudiekPlugin[] | undefined,
  Controllers extends LudiekController[] | undefined,
> = EngineControllers<Plugins, Controllers> extends [] ? never : RequestShape<EngineControllers<Plugins, Controllers>>;
