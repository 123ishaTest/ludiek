import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

/**
 * Base shape for all conditions.
 */
export interface BaseConditionShape {
  type: string;
}

/**
 * A LudiekCondition evaluates a given condition shape.
 */
export interface LudiekCondition<Condition extends BaseConditionShape = BaseConditionShape> {
  type: string;

  evaluate(condition: Condition): boolean;
}

/**
 * Given a tuple of LudiekConditions, produce a union of their condition shapes.
 */
export type ConditionShape<Conditions extends LudiekCondition[]> =
  Conditions[number] extends LudiekCondition<infer Shape> ? Shape : never;

/**
 * Extract the list of conditions from a plugin's config, or [] if none.
 */
export type PluginConditions<T extends LudiekPlugin> = T extends { config: { conditions: infer C } } ? C : never[];

/**
 * Given a list of plugins, produce the union of all their condition classes.
 * If no plugins or no conditions, returns [].
 */
export type PluginConditionList<Plugins extends LudiekPlugin[] | undefined = undefined> = Plugins extends undefined
  ? []
  : PluginConditions<NonNullable<Plugins>[number]> extends never[]
    ? []
    : PluginConditions<NonNullable<Plugins>[number]>;

/**
 * Combine plugin‑provided conditions and engine‑provided conditions into a single tuple.
 */
export type EngineConditions<
  Plugins extends LudiekPlugin[] | undefined,
  Conditions extends LudiekCondition[] | undefined,
> = [...PluginConditionList<Plugins>, ...(Conditions extends undefined ? [] : NonNullable<Conditions>)];

/**
 * Build the union of all available condition shapes for the engine.
 * Collapses to `never` if there are no conditions at all.
 */
export type EngineConditionShape<
  Plugins extends LudiekPlugin[] | undefined,
  Conditions extends LudiekCondition[] | undefined,
> = EngineConditions<Plugins, Conditions> extends [] ? never : ConditionShape<EngineConditions<Plugins, Conditions>>;
