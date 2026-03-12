import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import type { KindDefinitions } from '@louter/core/types';
import type { LouterStage } from '@louter/core/LouterStage';
import type { LouterContext } from '@louter/core/LouterContext';

/**
 * Write all content to a big JSON file
 */
export class LouterContentWriter<Kinds extends KindDefinitions> implements LouterStage<Kinds> {
  private readonly _directory: string;

  constructor(directory: string) {
    this._directory = directory;
  }

  run(ctx: LouterContext<Kinds>): void {
    ctx.warnings.forEach((warning) => {
      console.warn(warning.path, warning.message);
    });

    mkdirSync(this._directory, { recursive: true });

    const content = ctx.content;
    const fileName = path.join(this._directory, 'content.generated.json');

    writeFileSync(fileName, JSON.stringify(content, null, 2));
  }
}
