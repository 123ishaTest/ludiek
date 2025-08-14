import { LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';

export abstract class LudiekSaveEncoder {
  /**
   * Encodes the stringified save data
   * @param data The save data
   * @returns An encoded save string to be stored in localStorage
   */
  abstract encode(data: LudiekSaveData): string;

  /**
   * Decodes the save data into a JSON string
   * @param data The save data
   * @returns The save data in a JSON string format
   */
  abstract decode(data: string): LudiekSaveData;
}
