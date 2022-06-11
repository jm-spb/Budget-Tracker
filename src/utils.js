export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: 'RUB',
  style: 'currency',
  minimumFractionDigits: 0,
});

export const calculateValueSum = (dataToCalculate, value) =>
  dataToCalculate.reduce((sum, currentObject) => {
    let currentValue = null;
    switch (value) {
      case 'amount':
        currentValue = currentObject.amount;
        break;
      case 'max':
        currentValue = currentObject.max;
        break;
      default:
        console.warn('Enter valid string Value (amount OR max)');
        break;
    }
    return sum + currentValue;
  }, 0);

export const getProgressBarVariant = (amount, max) => {
  const ratio = amount / max;
  if (ratio < 0.5) return 'primary';
  if (ratio < 0.75) return 'warning';
  return 'danger';
};
