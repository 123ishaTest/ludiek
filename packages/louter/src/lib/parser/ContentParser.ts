import { parse } from 'yaml';
import { prettifyError, type z } from 'zod';
import { readFileSync } from 'node:fs';
import { type ContentKind } from '$lib/core/ContentKind.js';
import { type ParserConfig } from '$lib/parser/ParserConfig.js';
import { type ParserResult } from '$lib/parser/ParserResult.js';
import { type ParserWarning } from '$lib/parser/ParserWarning.js';
import { ParserWarningType } from '$lib/parser/ParserWarningType.js';
import { glob } from 'glob';

export class ContentParser<
  Schema extends z.ZodType<{ id: string }>,
  KindDescription extends ContentKind<Schema>,
  KindMap extends Record<string, KindDescription>,
> {
  private readonly _kinds: KindMap;

  constructor(kinds: KindMap) {
    this._kinds = kinds;
  }

  public parse(config: ParserConfig): ParserResult<Schema, KindDescription, KindMap> {
    // @ts-expect-error late declaration
    const content: {
      [Kind in keyof KindMap]: Record<string, z.infer<KindMap[Kind]['schema']>>;
    } = {};

    for (const key in this._kinds) {
      content[key] = {};
    }

    const warnings: ParserWarning[] = [];

    const filePaths = glob.sync(`${config.contentRoot}/**/*.y[a]ml`);
    console.info(`Reading ${filePaths.length} files from`, config.contentRoot);

    const parsedYaml = filePaths.flatMap((filePath) => {
      const extension = filePath.replace('.yml', '').replace('.yaml', '').split('.').pop() as string;
      const fileName = filePath.replace(config.contentRoot, '');

      try {
        const parsedData = parse(readFileSync(filePath, 'utf8'));
        return [
          {
            file: fileName,
            type: extension,
            data: parsedData,
          },
        ];
      } catch {
        warnings.push({
          file: filePath,
          type: ParserWarningType.InvalidYaml,
          message: `Could not parse file '${fileName}'. Is it valid yaml?`,
        });
      }
      return [];
    });

    parsedYaml.forEach((yaml) => {
      const kindDescription = this._kinds[yaml.type];
      if (!kindDescription) {
        warnings.push({
          file: yaml.file,
          type: ParserWarningType.UnrecognizedContentType,
          message: `Unrecognized contentType '${yaml.type}'`,
        });
        return;
      }

      const zodResult = kindDescription.schema.safeParse(yaml.data);
      if (!zodResult.success) {
        const validationError = prettifyError(zodResult.error);

        warnings.push({
          file: yaml.file,
          type: ParserWarningType.ZodValidationFailed,
          message: validationError.toString(),
        });
        return;
      }

      const id = yaml.data['id'];
      if (!id) {
        warnings.push({
          file: yaml.file,
          type: ParserWarningType.MissingGlobalIdKey,
          message: `Content does not seem to have the global idKey 'id'`,
        });
        return;
      }

      if (content[yaml.type][id]) {
        warnings.push({
          file: yaml.file,
          type: ParserWarningType.DuplicateId,
          message: `Duplicate id '${id}'`,
        });
        return;
      }
      content[yaml.type][id] = zodResult.data as z.infer<Schema>;
    });

    return {
      success: true,
      warnings: warnings,
      content: content,
    };
  }
}
