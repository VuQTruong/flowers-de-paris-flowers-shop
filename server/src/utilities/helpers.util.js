exports.roundHalf = (num) => {
  return Math.round(num * 2) / 2;
};

exports.dateFormat = new Intl.DateTimeFormat('en-EN', {
  year: 'numeric',
  month: 'numeric',
  day: '2-digit',
});
