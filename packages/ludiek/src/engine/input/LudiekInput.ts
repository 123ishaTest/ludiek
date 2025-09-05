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
 * Create a union of InputShapes from a list of LudiekInputs.
 */
export type InputShape<Inputs extends LudiekInput[]> = Inputs[number] extends LudiekInput<infer Input> ? Input : never;

/**
 * Extract the list of input from a plugins config and account for it being optional.
 */
export type PluginInputs<Plugins extends LudiekPlugin[] | undefined = undefined> = Plugins extends undefined
  ? []
  : NonNullable<Plugins>[number]['config'] extends { inputs?: (infer C)[] }
    ? C[]
    : never;

export type EngineInputs<Plugins extends LudiekPlugin[] | undefined, Inputs extends LudiekInput[] | undefined> = [
  ...PluginInputs<Plugins>,
  ...(Inputs extends undefined ? [] : NonNullable<Inputs>),
];

/**
 * Build all input available to the engine by combining the PluginInputs and ConfigInputs
 */
export type EngineInputShape<Plugins extends LudiekPlugin[] | undefined, Inputs extends LudiekInput[] | undefined> =
  | Inputs
  | Plugins extends undefined
  ? never
  : InputShape<EngineInputs<Plugins, Inputs>>;
