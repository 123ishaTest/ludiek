import { isEqual } from 'es-toolkit';

export const objectEquals = <X extends { amount: number }, Y extends { amount: number }>(one: X, other: Y): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { amount: _, ...oneRest } = one;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { amount: __, ...otherRest } = other;
  return isEqual(oneRest, otherRest);
};

export const simplifyItems = <T extends { amount: number }>(items: T[]): T[] => {
  const result: T[] = [];

  items.forEach((item) => {
    const index = result.findIndex((o) => objectEquals(o, item));
    if (index !== -1) {
      result[index].amount += item.amount;
    } else {
      result.push({ ...item });
    }
  });

  return result;
};
