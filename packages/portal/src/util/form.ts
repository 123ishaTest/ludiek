import { capitalize } from '@123ishatest/ludiek';

export const NESTING_SEPARATOR = '.';

export const labelFormat = (key: string): string => {
  return capitalize(key.split(NESTING_SEPARATOR).at(-1));
};