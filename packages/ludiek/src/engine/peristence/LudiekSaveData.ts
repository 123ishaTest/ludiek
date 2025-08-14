export interface LudiekSaveData {
  engine: LudiekEngineSaveData;
  features: LudiekFeaturesSaveData;
}

export type LudiekEngineSaveData = Record<string, object>;
export type LudiekFeaturesSaveData = Record<string, object>;
