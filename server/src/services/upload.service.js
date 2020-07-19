import userRepository from '../repository/user.repository';

const uploadService = {
  async changeUserImage(email, userURL) {
    await userRepository.setUserImage(email, userURL);
  },
};

export default uploadService;
