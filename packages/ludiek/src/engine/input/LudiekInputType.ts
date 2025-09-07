import { LudiekElement } from '@ludiek/engine/LudiekElement';
import { LudiekInput } from '@ludiek/engine/input/LudiekInput';

/**
 * Given a tuple of LudiekInputs, produce a union of their input shapes.
 */
export type ExtractInput<Inputs extends LudiekInput[]> =
  Inputs[number] extends LudiekInput<infer Shape> ? Shape : never;

/**
 * Extract the list of inputs from an element's config, or [] if none.
 */
export type ElementInputs<T extends LudiekElement> = T extends { config: { inputs: infer C } } ? C : never[];

/**
 * Given a list of elements, produce the union of all their input classes.
 * If no elements or no inputs, returns [].
 */
export type ElementInputList<Elements extends LudiekElement[] | undefined = undefined> = Elements extends undefined
  ? []
  : ElementInputs<NonNullable<Elements>[number]> extends never[]
    ? []
    : ElementInputs<NonNullable<Elements>[number]>;

/**
 * Combine element‑provided inputs and provided inputs into a single tuple.
 */
export type CombineInputs<Elements extends LudiekElement[] | undefined, Inputs extends LudiekInput[] | undefined> = [
  ...ElementInputList<Elements>,
  ...(Inputs extends undefined ? [] : NonNullable<Inputs>),
];

/**
 * Build the union of all available input shapes for the elements.
 * Collapses to `never` if there are no inputs at all.
 */
export type InputShape<Elements extends LudiekElement[] | undefined, Inputs extends LudiekInput[] | undefined> =
  CombineInputs<Elements, Inputs> extends [] ? never : ExtractInput<CombineInputs<Elements, Inputs>>;
