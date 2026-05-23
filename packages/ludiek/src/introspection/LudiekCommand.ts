export type LudiekArgumentType = 'string' | 'number' | 'boolean' | 'enum' | 'literal';

export interface LudiekArgument {
  field: string;
  type: LudiekArgumentType;
  options?: string[];
}

export interface LudiekCommand {
  command: string;
  arguments: LudiekArgument[];
}

export interface LudiekCommandData {
  type: string;
  arguments: (string | number | boolean)[];
}
