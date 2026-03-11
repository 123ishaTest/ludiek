import { z } from 'zod';
import { type ContentKind } from '$lib/core/ContentKind.js';
import { type ParserWarning } from '$lib/parser/ParserWarning.js';

export interface ParserResult<
  Schema extends z.ZodType<{ id: string }>,
  KindDescription extends ContentKind<Schema>,
  KindMap extends Record<string, KindDescription>,
> {
  success: boolean;

  warnings: ParserWarning[];
  content: {
    [Kind in keyof KindMap]: Record<string, z.infer<KindMap[Kind]['schema']>>;
  };
}
