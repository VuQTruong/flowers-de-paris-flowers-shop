const app = require('./app');
const { connectToDB } = require('./config/database');

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});

process.on('unhandledRejection', (error) => {
  console.log(`💥💥💥 Unhandled Rejection. ${error.name} ${error.message} `);
  server.close(() => {
    process.exit(1);
  });
});
