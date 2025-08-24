export const hash = (input: string): string => {
  return insecureHash(input);
};

export const insecureHash = (input: string): string => {
  let hash = 0,
    i,
    chr;
  if (input.length === 0) {
    return '0';
  }

  for (i = 0; i < input.length; i++) {
    chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};
