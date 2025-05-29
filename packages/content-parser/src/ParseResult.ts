import type { ContentError } from '#parser/ContentError';
import type { ContentUnit } from '#parser/ContentUnit';

export interface ParseResult {
  success: boolean;

  errors: ContentError[];

  units: ContentUnit[];
}