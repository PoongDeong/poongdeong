import socket from 'socket.io';
import socketioJwt from 'socketio-jwt';

import server from './server';

import * as MatchService from './services/match.service';
import convertToMilliSeconds from './services/time-option.service';

import {
  findRoomByTimeOption,
  filterRoom,
  appendRoom,
  getRoomIdFrom,
} from './services/room.service';

const io = socket(server);

io.use(socketioJwt.authorize({
  secret: process.env.SECRET,
  handshake: true,
}));

io.on('connection', (s) => {
  s.on('match', async ({ timeOption, categoryOption }) => {
    const room = findRoomByTimeOption(timeOption);
    if (room) {
      s.join(room.roomName, async () => {
        filterRoom(room.roomName);
        const userId = s.decoded_token.id;
        await MatchService.createMatchStart({
          matchId: room.matchId,
          userId,
          option: timeOption,
        });

        io.to(room.roomName).emit('START', {
          matchId: room.matchId,
          roomName: room.roomName,
        });

        const delay = convertToMilliSeconds(timeOption);

        setTimeout(() => {
          io.to(room.roomName).emit('END', { matchId: room.matchId });
        }, delay);
      });

      return;
    }

    const userId = s.decoded_token.id;
    const roomName = getRoomIdFrom(s);
    const matchId = await MatchService.createMatch(userId);

    appendRoom({
      roomName,
      timeOption,
      categoryOption,
      userId,
      matchId,
    });
    s.join(roomName, () => {
      io.to(roomName).emit('CREATE_ROOM');
    });
  });

  s.on('END_RESPONSE', async ({ matchId }) => {
    const userId = s.decoded_token.id;
    const matchEndId = await MatchService.createMatchEnd({ matchId, userId });

    s.emit('MATCH_END_CREATE', { matchEndId });
  });

  s.on('CALL_USER', (data) => {
    s.broadcast.to(data.roomName).emit('RECEIVE_CALL', {
      signal: data.signalData,
      from: data.from,
    });
  });

  s.on('ACCEPT_CALL', ({ roomName, signal }) => {
    s.broadcast.to(roomName).emit('CALL_ACCEPTED', signal);
  });
});

export default server;
