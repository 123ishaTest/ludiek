import type { PlantId } from '$lib/demo/content';

export interface FarmPlotState {
  plant: PlantId | null;
  progress: number;
}

export const emptyPlot = (): FarmPlotState => {
  return {
    plant: null,
    progress: 0,
  };
};

export interface FarmingState {
  plots: FarmPlotState[];
}
