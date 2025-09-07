import { LudiekElement } from '@ludiek/engine/LudiekElement';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';

/**
 * Given a tuple of LudiekControllers, produce a union of their request shapes.
 */
export type ExtractRequest<Controllers extends LudiekController[]> =
  Controllers[number] extends LudiekController<infer Shape> ? Shape : never;

/**
 * Extract the list of controllers from an element's config, or [] if none.
 */
export type ElementControllers<T extends LudiekElement> = T extends { config: { controllers: infer C } } ? C : never[];

/**
 * Given a list of elements, produce the union of all their controller classes.
 * If no elements or no controllers, returns [].
 */
export type ElementControllerList<Elements extends LudiekElement[] | undefined = undefined> = Elements extends undefined
  ? []
  : ElementControllers<NonNullable<Elements>[number]> extends never[]
    ? []
    : ElementControllers<NonNullable<Elements>[number]>;

/**
 * Combine element‑provided controllers and provided controllers into a single tuple.
 */
export type CombineControllers<
  Elements extends LudiekElement[] | undefined,
  Controllers extends LudiekController[] | undefined,
> = [...ElementControllerList<Elements>, ...(Controllers extends undefined ? [] : NonNullable<Controllers>)];

/**
 * Build the union of all available controller shapes for the elements.
 * Collapses to `never` if there are no controllers at all.
 */
export type RequestShape<
  Elements extends LudiekElement[] | undefined,
  Controllers extends LudiekController[] | undefined,
> =
  CombineControllers<Elements, Controllers> extends []
    ? never
    : ExtractRequest<CombineControllers<Elements, Controllers>>;
