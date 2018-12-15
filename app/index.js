const router = require('express').Router();
const auth = require('./auth');

// social authentication logic
require('./auth')();

// create an IO server instance
const ioServer = app => {
  app.locals.chatrooms = [];
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  io.use((socket, next) => {
    require('./session')(socket.request, {}, next);
  });
  require('./socket')(io, app);
  return server;
};

module.exports = {
  router: require('./routes')(),
  session: require('./session'),
  ioServer
};
