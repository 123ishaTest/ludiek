export type IsNonEmpty<T extends ReadonlyArray<unknown>> = T extends [] ? false : T extends never[] ? false : true;
