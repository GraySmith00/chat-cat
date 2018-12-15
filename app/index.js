const router = require('express').Router();
const auth = require('./auth');

// social authentication logic
require('./auth')();

module.exports = {
  router: require('./routes')(),
  session: require('./session')
};
