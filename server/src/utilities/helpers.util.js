const fs = require('fs');

exports.roundHalf = (num) => {
  return Math.round(num * 2) / 2;
};

exports.dateFormat = new Intl.DateTimeFormat('en-EN', {
  year: 'numeric',
  month: 'numeric',
  day: '2-digit',
});

exports.removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw Error('No Such File or Directory!');
    }
  });
};
