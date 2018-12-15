const config = require('../config');
const Mongoose = require('mongoose');

Mongoose.connect(
  config.dbURI,
  { useNewUrlParser: true }
);

// log an error if the connection fails
Mongoose.connection.on('error', err => {
  console.log('MongoDB Error: ', error);
});

module.exports = { Mongoose };
