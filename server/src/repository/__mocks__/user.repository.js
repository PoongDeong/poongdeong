const userRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  findByNickname: jest.fn(),
  findByEmail: jest.fn(),
  setUserImage: jest.fn(),
  getUserImage: jest.fn(),
};

export default userRepository;
