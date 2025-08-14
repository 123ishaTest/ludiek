import { LudiekCondition } from '@ludiek/engine/LudiekCondition';

/**
 * A condition which is always false
 */
export class AlwaysFalseCondition implements LudiekCondition<never> {
  type = 'always-false';

  evaluate(): boolean {
    return false;
  }
}
