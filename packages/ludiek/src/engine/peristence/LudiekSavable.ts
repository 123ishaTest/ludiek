export interface LudiekSavable {
  save(): object;

  load(data: object): void;
}
