import socket from 'socket.io';
import socketioJwt from 'socketio-jwt';

import server from './server';

import {
  findRoomByTimeOption,
  filterRoom,
  appendRoom,
} from './services/room.service';

const io = socket(server);

io.use(socketioJwt.authorize({
  secret: process.env.SECRET,
  handshake: true,
}));

io.on('connection', (s) => {
  s.on('match', ({ timeOption, categoryOption }) => {
    const room = findRoomByTimeOption(timeOption);
    if (room) {
      s.join(room.name, () => {
        io.to(room.name).emit('USER_JOIN');
        filterRoom(room.name);
      });
      // TODO: create match
      // TODO: send match
      return;
    }

    const name = s.id;
    appendRoom({
      owner: s.decoded_token.id,
      name: s.id,
      timeOption,
      categoryOption,
    });
    s.join(name, () => {
      io.to(name).emit('CREATE_ROOM');
    });
  });
});

export default server;
