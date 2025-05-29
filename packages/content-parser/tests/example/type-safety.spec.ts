import { describe, test } from 'vitest';
import * as path from 'node:path';
import { ContentParser } from '#parser/ContentParser';
import { ItemDetailSchema, LootDetailSchema } from '../models/Schemas';

const parser = new ContentParser({
  root: path.dirname(__dirname) + '/example',
  debug: true,
  idKey: 'hrid',
  types: [
    { key: 'item', schema: ItemDetailSchema },
    { key: 'loot', schema: LootDetailSchema },
  ],
});

describe('Type Safety', () => {
  test('retrieve all content by type', () => {
    // Act
    const result = parser.parse();

    console.log(result)
  });

});
