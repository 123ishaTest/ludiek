import type { LouterContext } from '@louter/core/LouterContext';
import { ContentMapFromKinds, KindDefinitions } from '@louter/core/types';

export const createContext = <Kinds extends KindDefinitions>(kinds: Kinds): LouterContext<Kinds> => {
  const content = {} as ContentMapFromKinds<Kinds>;
  for (const kind in kinds) {
    content[kind] = {};
  }

  return {
    config: {
      debug: true,
    },
    content: content,
    files: [],
    kinds: kinds,
    objects: [],
    warnings: [],
  };
};
