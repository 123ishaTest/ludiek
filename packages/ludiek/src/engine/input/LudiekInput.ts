import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

export interface BaseInputShape {
  type: string;
  amount: number;
}

export interface LudiekInput<Input extends BaseInputShape = BaseInputShape> {
  type: string;

  canLose(input: Input): boolean;

  lose(input: Input): void;
}

/**
 * Given a tuple of LudiekInputs, produce a union of their input shapes.
 */
export type InputShape<Inputs extends LudiekInput[]> = Inputs[number] extends LudiekInput<infer Shape> ? Shape : never;

/**
 * Extract the list of inputs from a plugin's config, or [] if none.
 */
export type PluginInputs<T extends LudiekPlugin> = T extends { config: { inputs: infer C } } ? C : never[];

/**
 * Given a list of plugins, produce the union of all their input classes.
 * If no plugins or no inputs, returns [].
 */
export type PluginInputList<Plugins extends LudiekPlugin[] | undefined = undefined> = Plugins extends undefined
  ? []
  : PluginInputs<NonNullable<Plugins>[number]> extends never[]
    ? []
    : PluginInputs<NonNullable<Plugins>[number]>;

/**
 * Combine plugin‑provided inputs and engine‑provided inputs into a single tuple.
 */
export type EngineInputs<Plugins extends LudiekPlugin[] | undefined, Inputs extends LudiekInput[] | undefined> = [
  ...PluginInputList<Plugins>,
  ...(Inputs extends undefined ? [] : NonNullable<Inputs>),
];

/**
 * Build the union of all available input shapes for the engine.
 * Collapses to `never` if there are no inputs at all.
 */
export type EngineInputShape<Plugins extends LudiekPlugin[] | undefined, Inputs extends LudiekInput[] | undefined> =
  EngineInputs<Plugins, Inputs> extends [] ? never : InputShape<EngineInputs<Plugins, Inputs>>;
