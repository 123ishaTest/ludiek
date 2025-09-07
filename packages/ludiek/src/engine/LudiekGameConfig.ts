import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { PluginMap } from '@ludiek/engine/LudiekEngineConfig';
import { LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { LudiekInput } from '@ludiek/engine/input/LudiekInput';
import { LudiekOutput } from '@ludiek/engine/output/LudiekOutput';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';

// TODO(@Isha): Use Zod for configuration for nice defaults
export interface LudiekGameConfig<
  Plugins extends LudiekPlugin[],
  Features extends readonly LudiekFeature<PluginMap<Plugins>>[],
  Conditions extends LudiekCondition[] | undefined = undefined,
  Inputs extends LudiekInput[] | undefined = undefined,
  Outputs extends LudiekOutput[] | undefined = undefined,
  Controllers extends LudiekController[] | undefined = undefined,
> {
  features: Features;
  conditions?: Conditions;
  inputs?: Inputs;
  outputs?: Outputs;
  controllers?: Controllers;

  /**
   * The key under which your game will be saved in local storage
   */
  saveKey: string;

  /**
   * How many seconds a tick should take.
   */
  tickDuration: number;

  /**
   * How often the game should save.
   */
  saveInterval: number;
}
