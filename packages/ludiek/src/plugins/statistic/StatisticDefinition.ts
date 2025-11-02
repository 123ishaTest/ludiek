export interface ScalarStatisticDefinition {
  id: string;
  type: 'scalar';
}

export interface MapStatisticDefinition {
  id: string;
  type: 'map';
}

export type StatisticDefinition = ScalarStatisticDefinition | MapStatisticDefinition;
