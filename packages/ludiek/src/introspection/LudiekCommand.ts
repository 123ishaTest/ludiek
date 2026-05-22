import { ZodSchema } from 'zod';

export type LudiekArgumentType = 'string' | 'number' | 'boolean' | 'enum' | 'literal';

export interface LudiekArgument {
  field: string;
  type: LudiekArgumentType;
  options?: string[];
}

export interface LudiekCommand {
  command: string;
  schema: ZodSchema;
  arguments: LudiekArgument[];
}

export interface LudiekCommandData {
  type: string;
  arguments: (string | number | boolean)[];
}
