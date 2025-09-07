export interface Progress {
  current: number;
  target: number;
  percentage: number;
}

export const progress = (current: number, target: number): Progress => {
  return {
    current,
    target,
    percentage: current / target,
  };
};
