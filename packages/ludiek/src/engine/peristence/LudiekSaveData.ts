export interface LudiekSaveData {
  engine: LudiekEngineSaveData;
  game?: LudiekGameSaveData;
}

export type LudiekEngineSaveData = {
  features: Record<string, object>;
  plugins: Record<string, object>;
};
export type LudiekGameSaveData = Record<string, object>;
