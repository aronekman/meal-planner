export const parseDecimal = (value: string, decimals?: number): number | null => {
  if (isNaN(parseFloat(value))) return null;
  if (!decimals) return parseFloat(value);
  const [int, fraction] = value.split('.');
  return parseFloat(`${int}.${fraction && fraction.slice(0, 2)}`);
};

export const parseInteger = (value: string) => (isNaN(parseInt(value)) ? null : parseInt(value));
