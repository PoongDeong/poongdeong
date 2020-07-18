import io from 'socket.io-client';

import { findRoomByTimeOption } from './services/room.service';

import server from './io';

jest.mock('./services/room.service');

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

  afterEach(() => {
    runningServer.close();
  });

  context('when exact room exists', () => {
    beforeEach(() => {
      findRoomByTimeOption.mockReturnValue({ name: 'name' });
    });

    it('receives user joined', (done) => {
      const socket = connect();

      socket.emit('match', {
        timeOption: '25분',
        categoryOption: '공부',
      });

      socket.on('USER_JOIN', () => {
        done();
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
        done();
      });
    });
  });
});
