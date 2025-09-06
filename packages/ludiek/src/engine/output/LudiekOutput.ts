import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

export interface BaseOutputShape {
  type: string;
  amount: number;
}

export interface LudiekOutput<Output extends BaseOutputShape = BaseOutputShape> {
  type: string;

  canGain(output: Output): boolean;
  gain(output: Output): void;
}

/**
 * Given a tuple of LudiekOutputs, produce a union of their output shapes.
 */
export type OutputShape<Outputs extends LudiekOutput[]> =
  Outputs[number] extends LudiekOutput<infer Shape> ? Shape : never;

/**
 * Extract the list of outputs from a plugin's config, or [] if none.
 */
export type PluginOutputs<T extends LudiekPlugin> = T extends { config: { outputs: infer C } } ? C : never[];

/**
 * Given a list of plugins, produce the union of all their output classes.
 * If no plugins or no outputs, returns [].
 */
export type PluginOutputList<Plugins extends LudiekPlugin[] | undefined = undefined> = Plugins extends undefined
  ? []
  : PluginOutputs<NonNullable<Plugins>[number]> extends never[]
    ? []
    : PluginOutputs<NonNullable<Plugins>[number]>;

/**
 * Combine plugin‑provided outputs and engine‑provided outputs into a single tuple.
 */
export type EngineOutputs<Plugins extends LudiekPlugin[] | undefined, Outputs extends LudiekOutput[] | undefined> = [
  ...PluginOutputList<Plugins>,
  ...(Outputs extends undefined ? [] : NonNullable<Outputs>),
];

/**
 * Build the union of all available output shapes for the engine.
 * Collapses to `never` if there are no outputs at all.
 */
export type EngineOutputShape<Plugins extends LudiekPlugin[] | undefined, Outputs extends LudiekOutput[] | undefined> =
  EngineOutputs<Plugins, Outputs> extends [] ? never : OutputShape<EngineOutputs<Plugins, Outputs>>;
