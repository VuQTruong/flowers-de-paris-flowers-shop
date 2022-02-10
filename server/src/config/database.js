const mongoose = require('mongoose');

exports.connectToDB = () => {
  return mongoose
    .connect(process.env.MONGODB_URL, {
      autoIndex: false,
    })
    .then(() => {
      console.log('Database Connected! 🎉✨');
    })
    .catch((error) => {
      console.log('💥 Database connection error 💥', error);
    });
};
