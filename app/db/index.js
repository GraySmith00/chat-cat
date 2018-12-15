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

// create a schema that defines user model
const chatUser = new Mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String
});

let userModel = Mongoose.model('chatUser', chatUser);

module.exports = { Mongoose, userModel };
