import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import type { KindDefinitions } from '@louter/core/types';
import type { LouterStage } from '@louter/core/LouterStage';
import type { LouterContext } from '../core/LouterContext.ts';

/**
 * Write all JSON schemas to the specified directory
 */
export class LouterJsonSchemaWriter implements LouterStage {
  private readonly _directory: string;

  constructor(directory: string) {
    this._directory = directory;
  }

  run<Kinds extends KindDefinitions>(ctx: LouterContext<Kinds>): void {
    mkdirSync(this._directory, { recursive: true });
    for (const kind in ctx.kinds) {
      const jsonSchema = ctx.kinds[kind].toJSONSchema({
        io: 'input',
      });
      const fileName = path.join(this._directory, `${kind}.schema.json`);
      writeFileSync(fileName, JSON.stringify(jsonSchema, null, 2));
    }
  }
}
