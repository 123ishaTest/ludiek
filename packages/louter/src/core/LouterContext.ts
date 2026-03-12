import type { ContentMapFromKinds, KindDefinitions } from '@louter/core/types';
import type { LouterFile } from '@louter/loader/LouterFile';
import type { LouterConfig } from '@louter/core/LouterConfig';
import type { LouterWarning } from '@louter/core/LouterWarning';
import type { LouterObject } from '@louter/core/LouterObject';

export interface LouterContext<Kinds extends KindDefinitions> {
  config: LouterConfig;

  kinds: Kinds;

  /**
   * Raw loaded files
   */
  files: LouterFile[];

  /**
   * Objects
   */
  objects: LouterObject[];

  warnings: LouterWarning[];
  content: ContentMapFromKinds<Kinds>;
}
