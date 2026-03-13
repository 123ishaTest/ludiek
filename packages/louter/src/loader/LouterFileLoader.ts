import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
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
    const filePaths = this.getAllFiles(this._contentRoot);
    ctx.files = filePaths.map((path: string) => {
      return {
        path,
        data: readFileSync(path, 'utf-8'),
      };
    });
  }

  /**
   * Recursively read all files
   */
  private getAllFiles(contentRoot: string): string[] {
    const entries = readdirSync(contentRoot, { withFileTypes: true });

    const files: string[] = [];

    for (const entry of entries) {
      const fullPath = path.join(contentRoot, entry.name);

      if (entry.isDirectory()) {
        files.push(...this.getAllFiles(fullPath));
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }

    return files;
  }
}
