import userRepository from '../repository/user.repository';

import jwtTokenService from './jwtToken.service';

const userService = {
  async getUserInfo(token) {
    const email = await jwtTokenService.verifyToken(token);
    const userInfo = await userRepository.findByEmail(email);
    return userInfo;
  },

  async getUserImageURL({ email }) {
    return await userRepository.getUserImage(email);
  },
};

export default userService;
