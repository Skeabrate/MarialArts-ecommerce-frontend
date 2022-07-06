const VALUE_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'PLN',
  style: 'currency',
});

export function formatValue(number: number) {
  return VALUE_FORMATTER.format(number);
}
