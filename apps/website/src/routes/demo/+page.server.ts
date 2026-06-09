import type { PageServerLoad } from './$types';
import {
  type KindDefinitions,
  Louter,
  type LouterContext,
  type LouterStage,
  LouterValidator,
  LouterYamlParser,
} from '@123ishatest/louter';
import { LouterJsonSchemaWriter } from '@123ishatest/louter/node';
import { engine } from '$lib/demo/demo.svelte';
import { contentFiles } from './index';

/**
 * Vite-based file loader using import.meta.glob (HMR-safe)
 */
class ViteFileLoader implements LouterStage {
  constructor(private readonly pages: Record<string, string>) {}

  public run<Kinds extends KindDefinitions>(ctx: LouterContext<Kinds>): void {
    ctx.files = Object.entries(this.pages).map(([path, data]) => ({
      path,
      data,
    }));
  }
}
class LudiekLogger implements LouterStage {
  run(ctx) {
    console.log('ludiekLogger', ctx);
  }
}


export const load: PageServerLoad = () => {

  const louter = new Louter([
    new ViteFileLoader(contentFiles),

    new LudiekLogger(),
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
