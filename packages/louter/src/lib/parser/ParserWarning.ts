import { ParserWarningType } from '$lib/parser/ParserWarningType.js';

export interface ParserWarning {
  file: string;
  type: ParserWarningType;
  message: string;
}
