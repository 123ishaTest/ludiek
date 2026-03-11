import { z } from 'zod';
import type { ZodStandardJSONSchemaPayload } from 'zod/v4/core';
import path from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import { type ContentKind } from '$lib/core/ContentKind.js';
import { ContentParser } from '$lib/parser/ContentParser.js';
import { ContentManager } from '$lib/content/ContentManager.js';
import { type ParserResult } from '$lib/parser/ParserResult.js';
import { type ParserConfig } from '$lib/parser/ParserConfig.js';

export class Louter<
  Schema extends z.ZodType<{ id: string }>,
  KindDescription extends ContentKind<Schema>,
  KindMap extends Record<string, KindDescription>,
> {
  private readonly _kinds: KindMap;
  private readonly _config: ParserConfig;

  private readonly _parser: ContentParser<Schema, KindDescription, KindMap>;
  private readonly _manager: ContentManager<Schema, KindDescription, KindMap>;

  constructor(kinds: KindMap, config: ParserConfig) {
    this._kinds = kinds;
    this._config = config;

    this._parser = new ContentParser(this._kinds);
    this._manager = new ContentManager(this._kinds);
  }

  /**
   */
  public parse(): ParserResult<Schema, KindDescription, KindMap> {
    const result = this._parser.parse(this._config);
    this._manager.load(result.content);
    return result;
  }

  /**
   * Write all JSON schemas to the specified directory
   */
  public writeJsonSchemas(directory: string): void {
    mkdirSync(directory, { recursive: true });
    for (const key in this._kinds) {
      const jsonSchema = this.getJsonSchema(key);
      const fileName = path.join(directory, `${key}.schema.json`);
      writeFileSync(fileName, JSON.stringify(jsonSchema, null, 2));
    }
  }

  /**
   * Get a JSON schema representation of the content kind
   */
  public getJsonSchema<const Kind extends keyof KindMap>(kind: Kind): ZodStandardJSONSchemaPayload<Schema> {
    return this._kinds[kind].schema.toJSONSchema({
      io: 'input',
    });
  }

  /**
   * Parse and write all content to a big JSON file
   */
  public writeContent(file: string): void {
    const result = this.parse();
    result.warnings.forEach((warning) => {
      console.warn(warning.file, warning.message);
    });
    const content = result.content;
    mkdirSync(this._config.outputDir, { recursive: true });

    const filePath = path.join(this._config.outputDir, file);
    writeFileSync(filePath, JSON.stringify(content, null, 2));
  }

  public get manager(): ContentManager<Schema, KindDescription, KindMap> {
    return this._manager;
  }
}
