const h = require('../helpers');

module.exports = (io, app) => {
  const allRooms = app.locals.chatrooms;

  io.of('/roomslist').on('connection', socket => {
    socket.on('getChatRooms', () => {
      socket.emit('chatRoomsList', JSON.stringify(allRooms));
    });

    socket.on('createNewRoom', newRoomInput => {
      // check to see if room with that title already exists
      // if not, create one and broadcast it to everyone
      if (!h.findRoomByName(allRooms, newRoomInput)) {
        allRooms.push({
          room: newRoomInput,
          roomID: h.randomHex(),
          users: []
        });

        // emit an updated list to the creator
        socket.emit('chatRoomsList', JSON.stringify(allRooms));

        // emit an updated list to everyone connected to rooms page
        socket.broadcast.emit('chatRoomsList', JSON.stringify(allRooms));
      }
    });
  });
};
