import type { SaveData } from './SaveData';

export interface Saveable {
  saveKey: string;

  save(): SaveData;

  load(data: Partial<SaveData>): void;
}
