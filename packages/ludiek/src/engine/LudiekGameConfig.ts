// TODO(@Isha): Use Zod for configuration for nice defaults
export interface LudiekGameConfig {
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
