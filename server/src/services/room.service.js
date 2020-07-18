let rooms = [];

export const getRooms = () => rooms;

export const appendRoom = (room) => {
  rooms = [...rooms, room];
};

export const setRooms = (data) => {
  rooms = data;
};

export const findRoomByTimeOption = (timeOption) => (
  rooms.find((room) => room.timeOption === timeOption)
);

export const filterRoom = (name) => {
  setRooms(rooms.filter((room) => room.name !== name));
};

export const getRoomIdFrom = (socket) => socket.id;
