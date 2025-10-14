import type { BuffDefinition } from '@123ishatest/ludiek';

export interface BuffDetail extends BuffDefinition {
  name: string;
  description: string;
  durationPerUse: number;
}
