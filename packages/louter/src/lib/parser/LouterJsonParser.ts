import type { KindDefinitions } from '$lib/core/types.js';
import type { LouterContext } from '$lib/core/LouterContext.js';
import type { LouterFile } from '$lib/loader/LouterFile.js';
import type { LouterStage } from '$lib/core/LouterStage.js';
import { getExtension, getKind } from '$lib/util/file.js';
import { LouterWarningType } from '$lib/core/LouterWarningType.js';

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
            kind: extension,
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
