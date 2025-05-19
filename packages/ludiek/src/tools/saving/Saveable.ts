import type { SaveData } from '#ludiek/tools/saving/SaveData';

export interface Saveable {
  saveKey: string;

  save(): SaveData;

  load(data: Partial<SaveData>): void;
}
