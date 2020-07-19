import {
  getRooms,
  appendRoom,
  setRooms,
  findRoomByTimeOption,
  filterRoom,
  getRoomIdFrom,
} from './room.service';

describe('roomService', () => {
  beforeEach(() => {
    setRooms([]);
  });

  describe('getRooms', () => {
    it('returns rooms', () => {
      const rooms = getRooms();

      expect(rooms).toHaveLength(0);
    });
  });

  describe('appendRoom', () => {
    it('adds rooms', () => {
      appendRoom({
        name: 'NEW_ROOM',
        timeOption: '25분',
        categoryOption: '공부',
        owner: 1,
      });

      const rooms = getRooms();

      expect(rooms).toHaveLength(1);
    });
  });

  describe('findRoomByTimeOption', () => {
    context('rooms안에 room이 있을경우', () => {
      const existingRoom = {
        name: 'NEW_ROOM',
        timeOption: '25분',
        categoryOption: '공부',
        owner: 1,
      };
      beforeEach(() => {
        appendRoom(existingRoom);
      });

      it('returns room', () => {
        expect(findRoomByTimeOption('25분')).toEqual(existingRoom);
      });
    });
  });

  describe('filterRoom', () => {
    context('with rooms containing the specific room', () => {
      const existingRoom = {
        name: 'NEW_ROOM',
        timeOption: '25분',
        categoryOption: '공부',
        owner: 1,
      };
      beforeEach(() => {
        appendRoom(existingRoom);
      });

      it('removes the room', () => {
        filterRoom('NEW_ROOM');

        expect(getRooms()).toHaveLength(0);
      });
    });
  });

  describe('getRoomIdFrom', () => {
    const socket = {
      id: '1234',
    };

    it('returns room id', () => {
      const id = getRoomIdFrom(socket);

      expect(id).toBe(socket.id);
    });
  });
});
