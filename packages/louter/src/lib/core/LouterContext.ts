import type { ContentMapFromKinds, KindDefinitions } from '$lib/core/types.js';
import type { LouterFile } from '$lib/loader/LouterFile.js';
import type { LouterConfig } from '$lib/core/LouterConfig.js';
import type { LouterWarning } from '$lib/core/LouterWarning.js';
import type { LouterObject } from '$lib/core/LouterObject.js';

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
  objects: LouterObject[]

  warnings: LouterWarning[];
  content: Partial<ContentMapFromKinds<Kinds>>;
}