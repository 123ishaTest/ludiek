import type { ContentMapFromKinds, KindDefinitions } from '@louter/core/types';
import type { LouterFile } from '@louter/loader/LouterFile';
import type { LouterConfig } from '@louter/core/LouterConfig';
import type { LouterWarning } from '@louter/core/LouterWarning';
import type { LouterObject } from '@louter/core/LouterObject';

export interface LouterContext<Kinds extends KindDefinitions> {
  config: LouterConfig;
  kinds: Kinds;

  // Raw files
  files: LouterFile[];

  // Parsed objects
  objects: LouterObject[];

  // Validated content
  content: ContentMapFromKinds<Kinds>;

  warnings: LouterWarning[];
}
