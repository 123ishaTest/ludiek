import { z } from 'zod';
import { EffectDefinition, EffectSchema } from '../Effect';

export const PrintEffectSchema = EffectSchema.extend({
  type: z.literal('print'),
  message: z.string(),
})
  .brand<'effect'>()
  .meta({
    title: 'PrintEffect',
    description: 'Prints a message to the console',
  });

export type PrintEffect = z.infer<typeof PrintEffectSchema>;

export class PrintEffectDefinition extends EffectDefinition {
  key: string = 'print';
  schema = PrintEffectSchema;

  perform(effect: PrintEffect): void {
    console.log(effect.message);
  }
}
