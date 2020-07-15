import userRepository from '../repository/user.repository';
import jwtTokenService from './jwtToken.service';

const auth = {
  async login({ email, password }) {
    if (await userRepository.checkPassword(email, password)) {
      return jwtTokenService.createToken({ email });
    }
    throw new Error('login failed');
  },
};

module.exports = auth;
