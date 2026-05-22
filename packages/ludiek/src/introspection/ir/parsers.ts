import { JSONSchema } from 'zod/v4/core';
import {
  ArrayNode,
  BooleanNode,
  LiteralNode,
  LudiekMetaData,
  LudiekNode,
  NumberNode,
  ObjectNode,
  RecordNode,
  StringNode,
} from '@ludiek/introspection/ir/nodes';
import { ZodSchema } from 'zod';

export interface ParseContext {
  isRequired?: boolean;
}

export const parseZodSchema = (schema: ZodSchema): LudiekNode => {
  const jsonSchema = schema.toJSONSchema({ io: 'input' });

  return parseSchema(jsonSchema, [], {});
};

export const parseSchema = (schema: JSONSchema.JSONSchema, path: string[], ctx: ParseContext): LudiekNode => {
  const type = schema.type;

  if (type === 'object' && schema.propertyNames) {
    return parseRecord(schema, path, ctx);
  }

  if (type === 'object' || schema.properties) {
    return parseObject(schema, path, ctx);
  }

  if (type === 'string' && schema.const) {
    return parseLiteral(schema, path, ctx);
  }

  if (type === 'string') {
    return parseString(schema, path, ctx);
  }

  if (type === 'boolean') {
    return parseBoolean(schema, path, ctx);
  }

  if (type === 'number' || type === 'integer') {
    return parseNumber(schema, path, ctx);
  }

  if (type === 'array') {
    return parseArray(schema, path, ctx);
  }

  return {
    kind: 'unknown',
    path,
  };
};

export const parseObject = (schema: JSONSchema.JSONSchema, path: string[], ctx: ParseContext): ObjectNode => {
  const required = new Set(schema.required ?? []);

  const fields: LudiekNode[] = Object.entries(schema.properties ?? {}).map(([name, prop]) => {
    const isRequired = required.has(name);

    return parseSchema(prop as JSONSchema.JSONSchema, [...path, name], {
      isRequired,
    });
  });
  const nullable = isNullable(schema);

  return {
    kind: 'object',
    path,

    ...(ctx.isRequired && { isRequired: ctx.isRequired }),
    ...(nullable && { isNullable: nullable }),

    fields,

    strict: schema.additionalProperties === false,
  };
};

export const parseRecord = (schema: JSONSchema.JSONSchema, path: string[], ctx: ParseContext): RecordNode => {
  const keys = parseSchema(schema.propertyNames as JSONSchema.JSONSchema, [...path, '<key>'], {
    ...ctx,
    isRequired: false,
  });
  const values = parseSchema(schema.additionalProperties as JSONSchema.JSONSchema, [...path, '<value>'], {
    ...ctx,
    isRequired: false,
  });
  return {
    kind: 'record',
    path,

    keys,
    values,
  };
};

export const parseArray = (schema: JSONSchema.JSONSchema, path: string[], ctx: ParseContext): ArrayNode => {
  return {
    kind: 'array',
    path,

    // TODO(@Isha): PrefixItems for tuples
    items: parseSchema(schema.items as JSONSchema.JSONSchema, [...path, '*'], ctx),
  };
};

export const parseString = (schema: JSONSchema.JSONSchema, path: string[], ctx: ParseContext): StringNode => {
  const nullable = isNullable(schema);

  const options = schema.enum as string[];
  const ludiek: LudiekMetaData = schema.ludiek as LudiekMetaData;
  return {
    kind: 'string',
    path,

    ...(options && { options }),

    ...(ctx.isRequired && { isRequired: ctx.isRequired }),
    ...(nullable && { isNullable: nullable }),

    ...(schema.default != undefined && { default: schema.default }),

    ...(schema.minLength && { minLength: schema.minLength }),
    ...(schema.maxLength && { maxLength: schema.maxLength }),
    ...(schema.pattern && { pattern: schema.pattern }),

    ...(schema.description && { description: schema.description }),

    ...(ludiek && { ludiek: ludiek }),
  };
};

export const parseBoolean = (schema: JSONSchema.JSONSchema, path: string[], ctx: ParseContext): BooleanNode => {
  const nullable = isNullable(schema);

  return {
    kind: 'boolean',
    path,

    ...(ctx.isRequired && { isRequired: ctx.isRequired }),
    ...(nullable && { isNullable: nullable }),

    ...(schema.default != undefined && { default: schema.default }),
  };
};

export const parseNumber = (schema: JSONSchema.JSONSchema, path: string[], ctx: ParseContext): NumberNode => {
  const nullable = isNullable(schema);

  return {
    kind: 'number',
    path,
    ...(ctx.isRequired && { isRequired: ctx.isRequired }),
    ...(nullable && { isNullable: nullable }),

    ...(schema.default != undefined && { default: schema.default }),
    ...(schema.minimum && { minimum: schema.minimum }),
    ...(schema.maximum && { maximum: schema.maximum }),
    // ...(schema.exclusiveMinimum && { exclusiveMinimum: schema.exclusiveMinimum }),
    // ...(schema.exclusiveMaximum && { exclusiveMaximum: schema.exclusiveMaximum }),

    ...(schema.description && { description: schema.description }),
  };
};

export const parseLiteral = (schema: JSONSchema.JSONSchema, path: string[], ctx: ParseContext): LiteralNode => {
  const value = schema.const as string;
  const nullable = isNullable(schema);

  return {
    kind: 'literal',
    path,

    ...(ctx.isRequired && { isRequired: ctx.isRequired }),
    ...(nullable && { isNullable: nullable }),

    default: value,
    options: [value],
  };
};

const isNullable = (schema: JSONSchema.JSONSchema): boolean => {
  if (schema.nullable) {
    return true;
  }

  if (Array.isArray(schema.type)) {
    return schema.type.includes('null');
  }

  return false;
};
