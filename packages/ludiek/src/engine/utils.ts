import { LudiekPlugin } from './LudiekPlugin';

export type APIOf<P> = Omit<P, keyof LudiekPlugin> extends infer O ? { [K in keyof O]: O[K] } : never;
