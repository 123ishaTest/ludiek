export enum ContentErrorType {
  UnrecognizedContentType = 'UnrecognizedContentType',
  InvalidYaml = 'InvalidYaml',
  MissingGlobalIdKey = 'MissingGlobalIdKey',
  ZodValidationFailed = 'ZodValidationFailed',
  DuplicateId = 'DuplicateId',
}

export interface ContentError {
  file: string;
  type: ContentErrorType;
  message: string;
}