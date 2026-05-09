import { LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { LudiekConsumer, LudiekInput } from '@ludiek/engine/input/LudiekConsumer';
import { cloneDeep } from 'es-toolkit';
import { InputNotFoundError } from '@ludiek/engine/input/InputError';

export class LudiekInputConcept<const Consumers extends readonly LudiekConsumer[]> extends LudiekEngineConcept<
  LudiekConsumer,
  Consumers
> {
  public raiseNotfoundError(type: string, registeredContributions: string[]): never {
    throw new InputNotFoundError(
      `Cannot consume input of type '${type}' because its consumer is not registered. Registered consumers are: ${registeredContributions.join(', ')}`,
    );
  }
  /**
   * Checks whether we can consume the input
   * @param input
   */
  public canConsume(input: LudiekInput<Consumers> | LudiekInput<Consumers>[]): boolean {
    if (!Array.isArray(input)) {
      input = [input];
    }

    return input.every((i) => {
      const consumer = this.get(i.type);
      const modified = consumer.modify(cloneDeep(i));
      return consumer.canConsume(modified);
    });
  }

  /**
   * Consume the input with no regards for whether we can consume it.
   * @param input
   */
  public consume(input: LudiekInput<Consumers> | LudiekInput<Consumers>[]): void {
    if (!Array.isArray(input)) {
      input = [input];
    }

    input.forEach((i) => {
      const processor = this.get(i.type);
      const modified = processor.modify(cloneDeep(i));
      processor.consume(modified);
    });
  }
  public modify<Input extends LudiekInput<Consumers>>(input: Input): Input {
    const consumer = this.get(input.type);
    return consumer.modify(cloneDeep(input)) as Input;
  }
}
