import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

export interface BaseConditionShape {
  type: string;
}

export interface LudiekCondition<Condition extends BaseConditionShape = BaseConditionShape> {
  type: string;

  evaluate(condition: Condition): boolean;
}

/**
 * Create a union of ConditionShapes from a list of LudiekConditions.
 */
export type ConditionShape<Conditions extends LudiekCondition[]> =
  Conditions[number] extends LudiekCondition<infer Condition> ? Condition : never;

/**
 * Extract the list of conditions from a plugins config and account for it being optional.
 */
export type PluginConditions<Plugins extends LudiekPlugin[] | undefined = undefined> = Plugins extends undefined
  ? []
  : NonNullable<Plugins>[number]['config'] extends { conditions?: (infer C)[] }
    ? C[]
    : never;

export type EngineConditions<
  Plugins extends LudiekPlugin[] | undefined,
  Conditions extends LudiekCondition[] | undefined,
> = [...PluginConditions<Plugins>, ...(Conditions extends undefined ? [] : NonNullable<Conditions>)];

/**
 * Build all conditions available to the engine by combining the PluginConditions and ConfigConditions
 */
export type EngineConditionShape<
  Plugins extends LudiekPlugin[] | undefined,
  Conditions extends LudiekCondition[] | undefined,
> = Conditions | Plugins extends undefined ? never : ConditionShape<EngineConditions<Plugins, Conditions>>;
