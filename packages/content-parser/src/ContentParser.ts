import { type ParserConfig } from '#parser/ContentParserConfig';
import { z } from 'zod';
import type { ParseResult } from '#parser/ParseResult';
import { type ContentError, ContentErrorType } from '#parser/ContentError';
import { glob } from 'glob';
import { parse } from 'yaml';
import { readFileSync } from 'node:fs';

export class ContentParser {
  config: ParserConfig;

  constructor(config: ParserConfig) {
    this.config = config;
  }

  public getSchema(key: string): z.ZodObject {
    const schema = this.config.types.find((type) => {
      return key === type.key;
    })?.schema;

    if (!schema) {
      throw Error(`Invalid schema key '${key}'`);
    }
    return schema;
  }

  public parse(): ParseResult {
    const errors: ContentError[] = [];

    const filePaths = glob.sync(`${this.config.root}/**/*.yml`);
    this.debug(`Reading ${filePaths.length} files from`, this.config.root);

    const parsedYaml = filePaths.flatMap((filePath) => {
      const extension = filePath.replace('.yml', '').split('.').pop() as string;
      const fileName = filePath.replace(this.config.root, '');

      try {
        const parsedData = parse(readFileSync(filePath, 'utf8'));
        return [
          {
            path: fileName,
            type: extension,
            data: parsedData,
          },
        ];
      } catch {
        errors.push({
          file: filePath,
          type: ContentErrorType.InvalidYaml,
          message: `Could not parse file '${fileName}'. Is it valid yaml?`,
        });
      }
      return [];
    });

    return {
      success: true,
      errors: errors,
      units: parsedYaml
    }

    // parsedYaml.forEach((yaml) => {
    //   const schema = this.types[yaml.type];
    //   if (!schema) {
    //     errors.push({
    //       file: yaml.file,
    //       type: ContentErrorType.UnrecognizedContentType,
    //       message: `Unrecognized contentType '${yaml.type}'`,
    //     });
    //     return;
    //   }
    //
    //   const zodResult = schema.safeParse(yaml.data);
    //   if (!zodResult.success) {
    //     const validationError = zodResult.error.message;
    //
    //     errors.push({
    //       file: yaml.file,
    //       type: ContentErrorType.ZodValidationFailed,
    //       message: validationError.toString(),
    //     });
    //     return;
    //   }
    //
    //   const id = yaml.data[this.config.idKey];
    //   if (!id) {
    //     errors.push({
    //       file: yaml.file,
    //       type: ContentErrorType.MissingGlobalIdKey,
    //       message: `Content does not seem to have the global idKey '${this.config.idKey}'`,
    //     });
    //     return;
    //   }
    //
    //   if (content[yaml.type][id]) {
    //     errors.push({
    //       file: yaml.file,
    //       type: ContentErrorType.DuplicateId,
    //       message: `Duplicate id '${id}'`,
    //     });
    //     return;
    //   }
    //   content[yaml.type][id] = zodResult.data as z.infer<S>;
    // });
    //
    // this.content = content;
    // return {
    //   errors: errors,
    //   success: errors.length === 0,
    // };
  }

  private debug(...args: string[]) {
    if (this.config.debug) {
      console.log(...args);
    }
  }

}
