const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: 'RUB',
  style: 'currency',
  minimumFractionDigits: 0,
});

export default currencyFormatter;
