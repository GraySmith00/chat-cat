module.exports = (io, app) => {
  const allRooms = app.locals.chatrooms;

  allRooms.push({
    room: 'Good Food',
    roomID: '0001',
    users: []
  });

  allRooms.push({
    room: 'Cloud Computing',
    roomID: '0002',
    users: []
  });

  io.of('/roomslist').on('connection', socket => {
    socket.on('getChatRooms', () => {
      socket.emit('chatRoomsList', JSON.stringify(allRooms));
    });
  });
};
