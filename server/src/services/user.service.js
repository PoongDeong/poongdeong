import userRepository from '../repository/user.repository';

import jwtTokenService from './jwtToken.service';

const userService = {
  async getUserInfo(token) {
    const email = await jwtTokenService.verifyToken(token);
    const userInfo = await userRepository.findById(email.id);
    return userInfo;
  },

  async getUserImageURL(email) {
    return await userRepository.getUserImage(email.id);
  },
};

export default userService;
