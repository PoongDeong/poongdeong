import userRepository from '../repository/user.repository';
import jwtTokenService from './jwtToken.service';

const emailRegex = /\b^[A-Za-z0-9.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$\b/;

const auth = {
  async login({ email, password }) {
    const isCorrect = await userRepository.checkPassword(email, password);
    if (!isCorrect) {
      throw new Error('login failed');
    }

    return jwtTokenService.createToken({ email });
  },

  async signup({ email, password, nickname }) {
    if (await this.isEmailFormat(email) === false) {
      throw new Error('Invalid email format');
    }
    if (userRepository.checkAvailability(email) === false) {
      throw new Error('Email already exists');
    }
    await userRepository.create({ email, password, nickname });
  },

  isEmailFormat(id) {
    return emailRegex.test(id);
  },
};

module.exports = auth;
