import { glob } from 'glob';
import { readFileSync } from 'node:fs';
import type { KindDefinitions } from '@louter/core/types';
import type { LouterStage } from '@louter/core/LouterStage';
import type { LouterContext } from '@louter/core/LouterContext';

/**
 * Loads local files using Node FileSystem
 */
export class LouterFileLoader implements LouterStage {
  private readonly _contentRoot;

  constructor(contentRoot: string) {
    this._contentRoot = contentRoot;
  }

  public run<Kinds extends KindDefinitions>(ctx: LouterContext<Kinds>): void {
    const filePaths = glob.sync(`${this._contentRoot}/**/*.y[a]ml`);
    ctx.files = filePaths.map((path: string) => {
      return {
        path,
        data: readFileSync(path, 'utf-8'),
      };
    });
  }
}
