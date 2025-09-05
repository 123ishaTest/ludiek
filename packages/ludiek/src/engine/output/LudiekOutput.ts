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
 * Create a union of OutputShapes from a list of LudiekOutputs.
 */
export type OutputShape<Outputs extends LudiekOutput[]> =
  Outputs[number] extends LudiekOutput<infer Output> ? Output : never;

/**
 * Extract the list of output from a plugins config and account for it being optional.
 */
export type PluginOutputs<Plugins extends LudiekPlugin[] | undefined = undefined> = Plugins extends undefined
  ? []
  : NonNullable<Plugins>[number]['config'] extends { outputs?: (infer C)[] }
    ? C[]
    : never;

export type EngineOutputs<Plugins extends LudiekPlugin[] | undefined, Outputs extends LudiekOutput[] | undefined> = [
  ...PluginOutputs<Plugins>,
  ...(Outputs extends undefined ? [] : NonNullable<Outputs>),
];

/**
 * Build all output available to the engine by combining the PluginOutputs and ConfigOutputs
 */
export type EngineOutputShape<Plugins extends LudiekPlugin[] | undefined, Outputs extends LudiekOutput[] | undefined> =
  | Outputs
  | Plugins extends undefined
  ? never
  : OutputShape<EngineOutputs<Plugins, Outputs>>;
