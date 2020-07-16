import bcrypt from 'bcrypt';

import userRepository from '../repository/user.repository';
import jwtTokenService from './jwtToken.service';

const emailRegex = /\b^[A-Za-z0-9.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$\b/;

const auth = {
  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not exist');
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new Error('User not exist');
    }

    return jwtTokenService.createToken({ id: user.id });
  },

  async signup({ email, password, nickname }) {
    const errors = [];

    let user = await userRepository.findByEmail(email);
    if (user) {
      errors.push('Email already exists');
    }
    user = await userRepository.findByNickname(nickname);
    if (user) {
      errors.push('nickname already exists');
    }

    if (errors.length > 0) {
      return errors;
    }

    const encrypted = await bcrypt.hash(password, 10);
    await userRepository.create({ email, nickname, password: encrypted });
    return '';
  },

  isEmailFormat(id) {
    return emailRegex.test(id);
  },
};

export default auth;
