require('dotenv').config();
const express = require('express');
const app = express();

app.get('/healthcheck', (req, res) => {
  return res.status(200).json({
    message: 'Ok',
  });
});

module.exports = app;
