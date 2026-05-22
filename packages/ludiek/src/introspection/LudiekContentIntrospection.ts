import { LudiekNode } from '@ludiek/introspection/ir/nodes';
import { ZodSchema } from 'zod';

export interface LudiekContentIntrospection {
  kinds: LudiekContentKindIntrospection[];
}

export interface LudiekContentKindIntrospection {
  kind: string;
  schema: ZodSchema;

  nodes: LudiekNode[];
  items: {
    id: string;
    [key: string]: unknown;
  }[];
}
