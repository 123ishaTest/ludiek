import { ContentParser } from '@123ishatest/content-parser';
import { demoGame } from '@123ishatest/ludiek';

export async function load() {
  const contentParser = new ContentParser({
    idKey: 'hrid',
    debug: true,
    // TODO(@Isha): Fix pathing
    root: '/Users/isha/Documents/ludiek-mono/apps/demo/content',
    types: [{ key: 'currency', schema: demoGame.engine.content['currency'] }],
  });

  return {
    content: contentParser.parse().units
  };
}
