import userRepository from '../repository/user.repository';

const uploadService = {
  async changeUserImage(email, userURL) {
    await userRepository.setUserImage(email.id, userURL);
  },
};

export default uploadService;
