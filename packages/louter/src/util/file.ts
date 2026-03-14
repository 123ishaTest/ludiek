import type { LouterFile } from '@louter/loader/LouterFile';

export const getExtension = (file: LouterFile): string | undefined => {
  if (!file.path.includes('.')) {
    return undefined;
  }
  return file.path.split('.').pop();
};

export const getKind = (file: LouterFile): string | undefined => {
  const splits = file.path.split('.');
  if (splits.length < 3) {
    return undefined;
  }
  return splits[splits.length - 2];
};
