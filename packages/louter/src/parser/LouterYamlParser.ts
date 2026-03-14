import { parse } from 'yaml';
import type { KindDefinitions } from '@louter/core/types';
import type { LouterContext } from '@louter/core/LouterContext';
import type { LouterFile } from '@louter/loader/LouterFile';
import type { LouterStage } from '@louter/core/LouterStage';
import { getExtension, getKind } from '@louter/util/file';
import { LouterWarningType } from '@louter/core/LouterWarningType';

/**
 * Turns loaded files into objects by parsing YAML parsing them
 */
export class LouterYamlParser implements LouterStage {
  public run<Kinds extends KindDefinitions>(ctx: LouterContext<Kinds>): void {
    ctx.objects = ctx.files.flatMap((file: LouterFile) => {
      const extension = getExtension(file);

      if (extension != 'yaml') {
        return [];
      }

      const kind = getKind(file);

      if (!kind) {
        ctx.warnings.push({
          type: LouterWarningType.MissingKind,
          path: file.path,
          message: "Could not get kind. Is the file formatted as 'id.kind.yaml'?",
        });
        return [];
      }

      try {
        const parsedData = parse(file.data);

        if (parsedData == undefined) {
          ctx.warnings.push({
            path: file.path,
            type: LouterWarningType.InvalidYaml,
            message: `Yaml file is empty`,
          });
          return [];
        }

        return [
          {
            path: file.path,
            kind: kind,
            data: parsedData,
          },
        ];
      } catch {
        ctx.warnings.push({
          path: file.path,
          type: LouterWarningType.InvalidYaml,
          message: `Could not parse Yaml file`,
        });
        return [];
      }
    });
  }
}
