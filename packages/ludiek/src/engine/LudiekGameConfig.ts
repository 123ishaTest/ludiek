// TODO(@Isha): Use Zod for configuration for nice defaults
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { PluginMap } from '@ludiek/engine/LudiekConfiguration';

export interface LudiekGameConfig<
  Plugins extends readonly LudiekPlugin[],
  Features extends readonly LudiekFeature<PluginMap<Plugins>>[],
> {
  features: Features;

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
