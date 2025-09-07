import { LudiekElement } from '@ludiek/engine/LudiekElement';
import { LudiekOutput } from '@ludiek/engine/output/LudiekOutput';

/**
 * Given a tuple of LudiekOutputs, produce a union of their output shapes.
 */
export type ExtractOutput<Outputs extends LudiekOutput[]> =
  Outputs[number] extends LudiekOutput<infer Shape> ? Shape : never;

/**
 * Extract the list of outputs from an element's config, or [] if none.
 */
export type ElementOutputs<T extends LudiekElement> = T extends { config: { outputs: infer C } } ? C : never[];

/**
 * Given a list of elements, produce the union of all their output classes.
 * If no elements or no outputs, returns [].
 */
export type ElementOutputList<Elements extends LudiekElement[] | undefined = undefined> = Elements extends undefined
  ? []
  : ElementOutputs<NonNullable<Elements>[number]> extends never[]
    ? []
    : ElementOutputs<NonNullable<Elements>[number]>;

/**
 * Combine element‑provided outputs and provided outputs into a single tuple.
 */
export type CombineOutputs<Elements extends LudiekElement[] | undefined, Outputs extends LudiekOutput[] | undefined> = [
  ...ElementOutputList<Elements>,
  ...(Outputs extends undefined ? [] : NonNullable<Outputs>),
];

/**
 * Build the union of all available output shapes for the elements.
 * Collapses to `never` if there are no outputs at all.
 */
export type OutputShape<Elements extends LudiekElement[] | undefined, Outputs extends LudiekOutput[] | undefined> =
  CombineOutputs<Elements, Outputs> extends [] ? never : ExtractOutput<CombineOutputs<Elements, Outputs>>;
