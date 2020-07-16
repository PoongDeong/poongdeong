const userRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  findByNickname: jest.fn(),
  findByEmail: jest.fn(),
};

export default userRepository;
