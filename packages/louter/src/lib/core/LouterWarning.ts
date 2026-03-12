import { LouterWarningType } from '$lib/core/LouterWarningType.js';

export interface LouterWarning {
  path: string;
  type: LouterWarningType;
  message: string;
}
