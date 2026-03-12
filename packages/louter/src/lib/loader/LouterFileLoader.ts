import { glob } from 'glob';
import { readFileSync } from 'node:fs';
import type { KindDefinitions } from '$lib/core/types.js';
import type { LouterStage } from '$lib/core/LouterStage.js';
import type { LouterContext } from '$lib/core/LouterContext.js';

/**
 * Loads local files using Node FileSystem
 */
export class LouterFileLoader<Kinds extends KindDefinitions> implements LouterStage<Kinds> {
  private readonly _contentRoot;

  constructor(contentRoot: string) {
    this._contentRoot = contentRoot;
  }

  public run(ctx: LouterContext<Kinds>): void {
    const filePaths = glob.sync(`${this._contentRoot}/**/*.y[a]ml`);
    ctx.files = filePaths.map((path: string) => {
      return {
        path,
        data: readFileSync(path, 'utf-8'),
      };
    });
  }
}
