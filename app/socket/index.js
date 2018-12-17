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

  io.of('/chatter').on('connection', socket => {
    // join a chatroom
    socket.on('join', data => {
      // add user to room
      const usersList = h.addUserToRoom(allRooms, data, socket);

      // update the list of active users as shown in the chatroom
      socket.broadcast
        .to(data.roomID)
        .emit('updateUsersList', JSON.stringify(usersList.users));

      socket.emit('updateUsersList', JSON.stringify(usersList.users));
    });

    // when a socket exits
    socket.on('disconnect', () => {
      // find the room to which the socket is connected and purge the user
      const room = h.removeUserFromRoom(allRooms, socket);
      socket.broadcast
        .to(room.roomID)
        .emit('updateUsersList', JSON.stringify(room.users));
    });

    // when a new message arrives
    socket.on('newMessage', data => {
      socket.to(data.roomID).emit('inMessage', JSON.stringify(data));
    });
  });
};
