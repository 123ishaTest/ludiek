export interface BaseNode {
  kind: string;

  /**
   * The fully traversed path to this node
   *
   * The final key can be considered the `field` of an object
   */
  path: string[];

  /**
   * A list of possible options
   */
  options?: string[];

  isRequired?: boolean;
  isNullable?: boolean;

  default?: unknown;

  // TODO(@Isha): Restructure under a single Meta
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

export interface LiteralNode extends BaseNode {
  kind: 'literal';
  options: string[];
}

/**
 * Backup Node for when we fail to parse the schema
 */
export interface UnknownNode extends BaseNode {
  kind: 'unknown';
}
