module.exports = (io, app) => {
  const allRooms = app.locals.chatrooms;
  io.of('/roomslist').on('connection', socket => {
    console.log('socket.io connected to client');
  });
};
