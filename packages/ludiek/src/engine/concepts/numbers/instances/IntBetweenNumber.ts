import { z } from 'zod';
import { NumberDefinition, NumberSchema } from '#ludiek/engine/concepts/numbers/Number';

export const IntBetweenNumberSchema = NumberSchema.extend({
  type: z.literal('int-between'),
  min: z.int(),
  max: z.int(),
})
  .strict()
  .brand<'number'>()
  .meta({
    title: 'IntBetweenNumber',
    description: 'A random integer between min and max',
  });

export type IntBetweenNumber = z.infer<typeof IntBetweenNumberSchema>;

export class IntBetweenNumberDefinition extends NumberDefinition {
  key: string = 'int-between';
  schema = IntBetweenNumberSchema;

  evaluate(number: IntBetweenNumber): number {
    // TODO(@Isha): Refactor to proper random utils modules
    return Math.floor(number.min + (number.max - number.min) * Math.random());
  }
}
