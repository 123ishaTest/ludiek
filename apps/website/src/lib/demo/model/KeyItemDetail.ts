import type { BonusContribution } from '@123ishatest/ludiek';

export interface KeyItemDetail {
  id: string;
  name: string;
  description: string;
  rewards?: BonusContribution[];
}
