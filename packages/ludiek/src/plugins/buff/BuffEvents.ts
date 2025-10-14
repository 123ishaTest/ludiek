import { BuffDefinition } from '@ludiek/plugins/buff/BuffDefinition';

/**
 * A buff has been activated
 */
export interface BuffActivated extends BuffDefinition {
  /**
   * The duration the buff has afterward
   */
  duration: number;
}

/**
 * A buff has been extended
 */
export interface BuffExtended extends BuffDefinition {
  /**
   * The duration the buff has afterward
   */
  duration: number;

  /**
   * How much duration was added
   */
  delta: number;
}

export type BuffExpired = BuffDefinition;
