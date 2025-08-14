import { LudiekSaveEncoder } from '@ludiek/engine/peristence/LudiekSaveEncoder';
import { LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';

export class LudiekLocalStorage {
  /**
   * Store the save object in local storage
   */
  public static store(key: string, data: LudiekSaveData, saveEncoder: LudiekSaveEncoder): void {
    const saveString = saveEncoder.encode(data);
    localStorage.setItem(key, saveString);
  }

  /**
   * Retrieve the save object from local storage
   */
  public static get(key: string, saveEncoder: LudiekSaveEncoder): LudiekSaveData {
    const storageData = localStorage.getItem(key);
    if (storageData == null) {
      return {
        features: {},
        engine: {},
      };
    }
    return saveEncoder.decode(storageData);
  }

  /**
   * Delete the save object from local storage
   */
  public static delete(key: string): void {
    localStorage.removeItem(key);
  }
}
