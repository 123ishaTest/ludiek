import { floatBetween } from '@ludiek/util/probability/random';

export interface WeightedOption {
  weight: number;
}

export const calculateWeightSum = <Option extends WeightedOption>(options: Option[]): number => {
  return options.reduce((sum, option) => sum + option.weight, 0);
};

export const getOneFrom = <Option extends WeightedOption>(options: Option[]): Option => {
  const sum = calculateWeightSum(options);
  let draw = floatBetween(0, sum);
  for (let i = 0; i < options.length; i++) {
    if (draw <= options[i].weight) {
      return options[i];
    } else {
      draw -= options[i].weight;
    }
  }
  throw new Error('This should never happen');
};
