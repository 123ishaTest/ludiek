export enum ParserWarningType {
  UnrecognizedContentType = 'UnrecognizedContentType',
  InvalidYaml = 'InvalidYaml',
  MissingGlobalIdKey = 'MissingGlobalIdKey',
  ZodValidationFailed = 'ZodValidationFailed',
  DuplicateId = 'DuplicateId',
}
