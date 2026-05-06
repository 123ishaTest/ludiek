import { LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { LudiekProducer, LudiekOutput } from '@ludiek/engine/output/LudiekProducer';
import { cloneDeep } from 'es-toolkit';
import { OutputNotFoundError } from '@ludiek/engine/output/OutputError';

export class LudiekOutputConcept<const Producers extends readonly LudiekProducer[]> extends LudiekEngineConcept<
  LudiekProducer,
  Producers
> {
  public raiseNotfoundError(type: string, registeredContributions: string[]) {
    throw new OutputNotFoundError(
      `Cannot produce output of type '${type}' because its producer is not registered. Registered producers are: ${registeredContributions.join(', ')}`,
    );
  }
  /**
   * Checks whether we can produce the output
   * @param output
   */
  public canProduce(output: LudiekOutput<Producers> | LudiekOutput<Producers>[]): boolean {
    if (!Array.isArray(output)) {
      output = [output];
    }

    return output.every((i) => {
      const producer = this.get(i.type);
      const modified = producer.modify(cloneDeep(i));
      return producer.canProduce(modified);
    });
  }

  /**
   * Produce the output with no regards for whether we can produce it.
   * @param output
   */
  public produce(output: LudiekOutput<Producers> | LudiekOutput<Producers>[]): void {
    if (!Array.isArray(output)) {
      output = [output];
    }

    output.forEach((i) => {
      const processor = this.get(i.type);
      const modified = processor.modify(cloneDeep(i));
      processor.produce(modified);
    });
  }
  public modify<Output extends LudiekOutput<Producers>>(output: Output): Output {
    const producer = this.get(output.type);
    return producer.modify(cloneDeep(output)) as Output;
  }
}
