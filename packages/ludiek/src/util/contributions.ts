export const getType = (contribution: { type: string } | { type: string }[]): string => {
  if (Array.isArray(contribution)) {
    return contribution.map((c) => c.type).join(', ');
  }
  return contribution.type;
};
