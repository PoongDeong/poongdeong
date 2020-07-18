import userRepository from '../repository/user.repository';
import jwtTokenService from './jwtToken.service';

const user = {
  async getUserInfo(token) {
    const email = await jwtTokenService.verifyToken(token);
    const userInfo = await userRepository.findByEmail(email);
    return userInfo;
  },
};

export default user;