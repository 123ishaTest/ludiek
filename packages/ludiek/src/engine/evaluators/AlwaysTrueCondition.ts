import { LudiekCondition } from '@ludiek/engine/LudiekCondition';

/**
 * A condition which is always true
 */
export class AlwaysTrueCondition implements LudiekCondition<never> {
  type = 'always-true';

  evaluate(): boolean {
    return true;
  }
}
