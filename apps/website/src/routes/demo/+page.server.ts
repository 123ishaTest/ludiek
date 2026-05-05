import type { PageServerLoad } from './$types';
import { Louter, LouterValidator, LouterYamlParser } from '@123ishatest/louter';
import { LouterFileLoader, LouterJsonSchemaWriter } from '@123ishatest/louter/node';
import { engine } from '$lib/demo/demo.svelte';

export const load: PageServerLoad = () => {
  const louter = new Louter([
    new LouterFileLoader('src/lib/demo/content'),

    // Parses the YAML that was found
    new LouterYamlParser(),

    // Validates it against the schemas
    new LouterValidator(),

    // Writes utility JSON Schemas
    new LouterJsonSchemaWriter(),
  ]);

  const result = louter.run(engine.content);

  return {
    content: result.content,
  };
};
