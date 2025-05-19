import { z } from 'zod';
import { NumberDefinition, NumberSchema } from '#ludiek/engine/concepts/numbers/Number';

export const LiteralNumberSchema = NumberSchema.extend({
  type: z.literal('literal'),
  value: z.int().describe('The literal value this number should be'),
})
  .strict()
  .brand<'number'>()
  .meta({
    title: 'LiteralNumber',
    description: 'A literal number',
  });

export type LiteralNumber = z.infer<typeof LiteralNumberSchema>;

export class LiteralNumberDefinition extends NumberDefinition {
  key: string = 'literal';
  schema = LiteralNumberSchema;

  evaluate(number: LiteralNumber): number {
    return number.value;
  }
}
