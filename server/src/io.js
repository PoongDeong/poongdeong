import socket from 'socket.io';
import socketioJwt from 'socketio-jwt';

import server from './server';

const io = socket(server);

io.use(socketioJwt.authorize({
  secret: process.env.SECRET,
  handshake: true,
}));

let rooms = [{
  name: 'gibong',
  timeOption: '25분',
  categoryOption: '코딩',
}];

io.on('connection', (s) => {
  s.on('match', ({ timeOption, categoryOption }) => {
    const room = rooms.find((it) => it.timeOption === timeOption);
    if (room) {
      s.join(room.name, () => {
        io.to(room.name).emit('a new user has joined the room');
        rooms = rooms.filter((it) => it.name !== room.name);
      });
      // TODO: create match
      // TODO: send match
      return;
    }

    const name = s.id;
    rooms = [
      ...rooms,
      {
        owner: s.decoded_token.id,
        name: s.id,
        timeOption,
        categoryOption,
      },
    ];
    s.join(name, () => {
      io.to(name).emit('created a room');
    });
  });
});

export default server;
