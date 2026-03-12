import type { LouterFile } from '$lib/loader/LouterFile.js';

export const getExtension = (file: LouterFile): string | undefined => {
  return file.path.split('.').pop();
};

export const getKind = (file: LouterFile): string | undefined => {
  const splits = file.path.split('.')
  return splits[splits.length - 2]
};
