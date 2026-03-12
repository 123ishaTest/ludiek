import { LouterWarningType } from '@louter/core/LouterWarningType';

export interface LouterWarning {
  path: string;
  type: LouterWarningType;
  message: string;
}
