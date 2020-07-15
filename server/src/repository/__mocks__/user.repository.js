const userRepository = {
  checkPassword: jest.fn(),
  create: jest.fn(),
  checkNicknameAvailability: jest.fn(),
  checkAvailability: jest.fn(),
};

export default userRepository;
