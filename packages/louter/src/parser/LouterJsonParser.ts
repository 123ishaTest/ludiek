import type { KindDefinitions } from '@louter/core/types';
import type { LouterContext } from '@louter/core/LouterContext';
import type { LouterFile } from '@louter/loader/LouterFile';
import type { LouterStage } from '@louter/core/LouterStage';
import { getExtension, getKind } from '@louter/util/file';
import { LouterWarningType } from '@louter/core/LouterWarningType';

/**
 * Turns loaded files into objects by parsing JSON parsing them
 */
export class LouterJsonParser<Kinds extends KindDefinitions> implements LouterStage<Kinds> {
  public run(ctx: LouterContext<Kinds>): void {
    ctx.objects = ctx.files.flatMap((file: LouterFile) => {
      const extension = getExtension(file);

      if (extension != 'json') {
        return [];
      }

      const kind = getKind(file);

      if (!kind) {
        ctx.warnings.push({
          type: LouterWarningType.MissingKind,
          path: file.path,
          message: "Could not get kind. Is the file formatted as 'id.kind.json'?",
        });
        return [];
      }

      try {
        return [
          {
            path: file.path,
            kind: kind,
            data: JSON.parse(file.data),
          },
        ];
      } catch {
        ctx.warnings.push({
          path: file.path,
          type: LouterWarningType.InvalidJson,
          message: `Could not parse file. Is it valid Json?`,
        });
        return [];
      }
    });
  }
}
