import { describe, expect, it } from 'vitest';

import { KeyItemPlugin } from '@ludiek/plugins/keyItem/KeyItemPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { TrueEvaluator } from '@ludiek/stdlib/condition/TrueCondition';
import { FalseEvaluator } from '@ludiek/stdlib/condition/FalseCondition';
import { UnknownKeyItemError } from '@ludiek/plugins/keyItem/KeyItemErrors';

const keyItem = new KeyItemPlugin();
new LudiekEngine({
  evaluators: [new TrueEvaluator(), new FalseEvaluator()],
  plugins: [keyItem],
});

describe('Bad flow', () => {
  it('throws an error when accessing an unknown KeyItem ', () => {
    expect(() => keyItem.hasKeyItem('wrong')).toThrow(UnknownKeyItemError);
  });
});
