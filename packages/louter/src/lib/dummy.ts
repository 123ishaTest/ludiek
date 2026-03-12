import { z } from 'zod';
import { Louter } from '$lib/core/Louter.js';
import { LouterFileLoader } from '$lib/loader/LouterFileLoader.js';
import { LouterYamlParser } from '$lib/parser/LouterYamlParser.js';
import { LouterValidator } from '$lib/validator/LouterValidator.js';

const CurrencySchema = z.strictObject({ id: z.string(), name: z.string() });
const UpgradeSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  cost: z.strictObject({
    currency: z.string(),
    amount: z.number().default(4),
  }),
});

const louter = new Louter([
  new LouterFileLoader('.'),
  new LouterYamlParser(),
  new LouterValidator(),
])

const context = louter.run({
  currency: CurrencySchema,
  upgrade: UpgradeSchema,
})

console.log(context);