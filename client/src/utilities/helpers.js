export const dateFormat = new Intl.DateTimeFormat('en-EN', {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: '2-digit',
});

export const currencyFormat = new Intl.NumberFormat('en-EN', {
  style: 'currency',
  currency: 'CAD',
});
