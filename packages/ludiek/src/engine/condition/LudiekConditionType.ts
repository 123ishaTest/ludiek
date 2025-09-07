import { LudiekElement } from '@ludiek/engine/LudiekElement';
import { LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';

/**
 * Given a tuple of LudiekConditions, produce a union of their condition shapes.
 */
export type ExtractCondition<Conditions extends LudiekCondition[]> =
  Conditions[number] extends LudiekCondition<infer Shape> ? Shape : never;

/**
 * Extract the list of conditions from an element's config, or [] if none.
 */
export type ElementConditions<T extends LudiekElement> = T extends { config: { conditions: infer C } } ? C : never[];

/**
 * Given a list of elements, produce the union of all their condition classes.
 * If no elements or no conditions, returns [].
 */
export type ElementConditionList<Elements extends LudiekElement[] | undefined = undefined> = Elements extends undefined
  ? []
  : ElementConditions<NonNullable<Elements>[number]> extends never[]
    ? []
    : ElementConditions<NonNullable<Elements>[number]>;

/**
 * Combine element‑provided conditions and provided conditions into a single tuple.
 */
export type CombineConditions<
  Elements extends LudiekElement[] | undefined,
  Conditions extends LudiekCondition[] | undefined,
> = [...ElementConditionList<Elements>, ...(Conditions extends undefined ? [] : NonNullable<Conditions>)];

/**
 * Build the union of all available condition shapes for the elements.
 * Collapses to `never` if there are no conditions at all.
 */
export type ConditionShape<
  Elements extends LudiekElement[] | undefined,
  Conditions extends LudiekCondition[] | undefined,
> =
  CombineConditions<Elements, Conditions> extends []
    ? never
    : ExtractCondition<CombineConditions<Elements, Conditions>>;
