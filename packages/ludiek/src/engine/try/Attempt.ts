export type Jippie = object;

type MaybeKey<T, K extends PropertyKey> = K extends keyof T ? T[K] : never;

export class Attempt<Config = Jippie> {
  public try(): Config {
    return null as unknown as Config;
  }

  public get thing(): MaybeKey<Config, 'thing'> {
    return null as unknown as MaybeKey<Config, 'thing'>;
  }
}
