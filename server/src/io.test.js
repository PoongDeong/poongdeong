import io from 'socket.io-client';

import server from './io';

describe('io', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpYm9uZ0BnbWFpbC5jb20iLCJpYXQiOjE1OTQ5NzM1NzcsImV4cCI6MTU5NTAzNDc3Nywic3ViIjoidXNlckluZm8ifQ.tmBN7GTXvYVO5aJLbUTmMkypnjtN6Bh82tmye2CRA34';

  let runningServer;

  beforeEach((done) => {
    runningServer = server.listen(3000, () => {
      done();
    });
  });

  afterEach(() => {
    runningServer.close();
  });

  context('when exact room exists', () => {
    it('receives user joined', (done) => {
      const socket = io('http://localhost:3000', {
        query: `token=${token}`,
      });

      socket.emit('match', {
        timeOption: '25분',
        categoryOption: '공부',
      });

      socket.on('a new user has joined the room', () => {
        done();
      });
    });
  });

  context('when exact room not exists', () => {
    it('creates new room', (done) => {
      const socket = io('http://localhost:3000', {
        query: `token=${token}`,
      });

      socket.emit('match', {
        timeOption: '50분',
        categoryOption: '공부',
      });

      socket.on('created a room', () => {
        done();
      });
    });
  });

  describe('create and join', () => {
    it('recevies join event', (done) => {
      const socket = io('http://localhost:3000', {
        query: `token=${token}`,
      });

      socket.emit('match', {
        timeOption: '50분',
        categoryOption: '공부',
      });

      const socket2 = io('http://localhost:3000', {
        query: `token=${token}`,
      });

      socket2.emit('match', {
        timeOption: '50분',
        categoryOption: '공부',
      });

      socket.on('a new user has joined the room', () => {
        done();
      });
    });
  });
});
