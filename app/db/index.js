const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

// log an error if the connection fails
Mongoose.connection.on('error', err => {
  console.log('MongoDB Error: ', error);
});

module.exports = { Mongoose };
