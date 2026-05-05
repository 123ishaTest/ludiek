import z, { ZodSchema, ZodType } from 'zod';

/**
 * Recursively walk through a schema and replace the placeholder with schemas
 */
export const replaceSchema = (schema: ZodType, searchValue: ZodSchema, replaceValue: ZodSchema): ZodType => {
  if (schema == searchValue) {
    return replaceValue;
  }

  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const newShape: Record<string, ZodType> = {};

    for (const key in shape) {
      newShape[key] = replaceSchema(shape[key], searchValue, replaceValue);
    }

    return z.object(newShape);
  }

  return schema;
};
