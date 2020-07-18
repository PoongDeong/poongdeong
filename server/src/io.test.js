import io from 'socket.io-client';

import { findRoomByTimeOption, getRoomIdFrom } from './services/room.service';

import * as MatchService from './services/match.service';
import convertToMilliSeconds from './services/time-option.service';

import server from './io';

jest.mock('./services/room.service');
jest.mock('./services/match.service');
jest.mock('./services/time-option.service');

describe('io', () => {
  let runningServer;

  const connect = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpYm9uZ0BnbWFpbC5jb20iLCJpYXQiOjE1OTUwNDc3MzMsInN1YiI6InVzZXJJbmZvIn0.06vOlcXGYOD5oCpSEjvOBsqSfSE8Isbd6wIQXR0Ahsw';

    return io('http://localhost:3000', {
      query: `token=${token}`,
    });
  };

  beforeEach((done) => {
    runningServer = server.listen(3000, done);
  });

  beforeEach(() => {
    MatchService.createMatch.mockClear();
    MatchService.createMatchStart.mockClear();
    MatchService.createMatchEnd.mockClear();

    convertToMilliSeconds.mockReturnValue(1000);
  });

  afterEach(() => {
    runningServer.close();
  });

  context('when exact room exists', () => {
    beforeEach(() => {
      findRoomByTimeOption.mockReturnValue({
        roomName: 'name',
        matchId: '1234',
      });
    });

    it('receives user joined', (done) => {
      const socket = connect();

      socket.emit('match', {
        timeOption: '25분',
        categoryOption: '공부',
      });

      socket.on('START', ({ matchId, roomName }) => {
        expect(MatchService.createMatchStart).toBeCalled();

        expect(matchId).not.toBeUndefined();
        expect(roomName).not.toBeUndefined();

        socket.on('END', () => {
          done();
        });
      });
    });
  });

  context('when exact room not exists', () => {
    beforeEach(() => {
      findRoomByTimeOption.mockReturnValue();
    });

    it('creates new room', (done) => {
      const socket = connect();

      socket.emit('match', {
        timeOption: '50분',
        categoryOption: '공부',
      });

      socket.on('CREATE_ROOM', () => {
        expect(MatchService.createMatch).toBeCalled();

        done();
      });
    });
  });

  context('when response to end', () => {
    beforeEach(() => {
      MatchService.createMatchEnd.mockResolvedValue(1);
    });

    it('creats matchEnd', (done) => {
      const socket = connect();

      socket.emit('END_RESPONSE', { matchId: 1 });

      socket.on('MATCH_END_CREATE', ({ matchEndId }) => {
        expect(matchEndId).toBe(1);

        done();
      });
    });
  });

  context('when call to user', () => {
    const matchId = '1234';
    const roomName = '1234';
    const signal = '1234';

    beforeEach(() => {
      findRoomByTimeOption
        .mockReturnValueOnce(null)
        .mockReturnValueOnce({ matchId, roomName });
      getRoomIdFrom.mockReturnValue(roomName);
      MatchService.createMatch.mockResolvedValue(matchId);
    });

    it('sends callUser event to other user', (done) => {
      const user = connect();

      user.on('CREATE_ROOM', () => {
        const other = connect();

        other.on('RECEIVE_CALL', () => {
          other.emit('ACCEPT_CALL', {
            roomName,
            signal,
          });
        });

        other.emit('match', {
          timeOption: '50분',
          categoryOption: '공부',
        });
      });

      user.on('START', (data) => {
        user.emit('CALL_USER', {
          signalData: '',
          from: '',
          roomName: data.roomName,
        });
      });

      user.emit('match', {
        timeOption: '50분',
        categoryOption: '공부',
      });

      user.on('CALL_ACCEPTED', () => {
        done();
      });
    });
  });
});
