import { LudiekElement } from '@ludiek/engine/LudiekElement';

/**
 * Extend to create your own custom plugin
 */
export abstract class LudiekPlugin extends LudiekElement {
  public abstract loadContent(content: { id: string }[]): void;
}
