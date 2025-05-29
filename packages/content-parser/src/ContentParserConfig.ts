import { z } from 'zod';

export interface ParserConfig {
  root: string;
  debug?: boolean
  idKey?: string
  types: {
    key: string,
    schema: z.ZodObject
  }[];
}
