import { LudiekSaveEncoder } from '@ludiek/engine/peristence/LudiekSaveEncoder';
import { LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';

/**
 * A save encoder which converts the data to JSON
 */
export class LudiekJsonSaveEncoder extends LudiekSaveEncoder {
  encode(data: LudiekSaveData): string {
    return JSON.stringify(data);
  }

  decode(data: string): LudiekSaveData {
    return JSON.parse(data);
  }
}
