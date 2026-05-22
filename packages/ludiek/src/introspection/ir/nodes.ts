export interface BaseNode {
  kind: string;

  path: string[];

  options?: string[];

  isRequired?: boolean;
  isNullable?: boolean;

  default?: unknown;

  description?: string;
  title?: string;

  ludiek?: LudiekMetaData;
}

export interface LudiekMetaData {
  reference?: string;
}

export type LudiekNode =
  | BooleanNode
  | StringNode
  | ObjectNode
  | NumberNode
  | ArrayNode
  | RecordNode
  | LiteralNode
  | UnknownNode;

export interface StringNode extends BaseNode {
  kind: 'string';

  minLength?: number;
  maxLength?: number;
  pattern?: string;

  format?: 'uuid' | 'email' | 'text';
}

export interface NumberNode extends BaseNode {
  kind: 'number';

  minimum?: number;
  maximum?: number;
}

export interface BooleanNode extends BaseNode {
  kind: 'boolean';
}

export interface ObjectNode extends BaseNode {
  kind: 'object';

  fields: LudiekNode[];

  strict: boolean;
}

export interface RecordNode extends BaseNode {
  kind: 'record';

  keys: LudiekNode;

  values: LudiekNode;
}

export interface ArrayNode extends BaseNode {
  kind: 'array';

  items: LudiekNode;
  // TODO(@Isha): minLength and such?
}

// TODO(@Isha): Add new nodes to union

export interface LiteralNode extends BaseNode {
  kind: 'literal';
  options: string[];
}

export interface UnknownNode extends BaseNode {
  kind: 'unknown';
}

// TODO(@Isha): Add enums
