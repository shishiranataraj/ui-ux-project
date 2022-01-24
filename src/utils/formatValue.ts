const formatValue = (value: number): string =>
  Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value);

export default formatValue;
