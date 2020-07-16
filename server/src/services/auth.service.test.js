import bcrypt from 'bcrypt';

import authService from './auth.service';

import jwtTokenService from './jwtToken.service';

import userRepository from '../repository/user.repository';

jest.mock('../repository/user.repository');
jest.mock('./jwtToken.service');
jest.mock('bcrypt');

describe('auth', () => {
  const email = 'gibong@gmail.com';
  const password = '1234';
  const nickname = 'NICK_NAME';

  const user = { email, password, nickname };

  const token = 'abcd';

  beforeEach(() => {
    jwtTokenService.createToken.mockClear();
    userRepository.create.mockClear();
  });

  beforeEach(() => {
    jwtTokenService.createToken.mockReturnValue(token);
  });

  describe('login', () => {
    context('with given existing id and right password', () => {
      beforeEach(async () => {
        userRepository.findByEmail.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);
      });

      it('returns a userInfo ', async () => {
        const userInfo = await authService.login({ email, password });

        expect(userInfo).toBe(token);
      });
    });

    context('with not existing user', () => {
      beforeEach(async () => {
        userRepository.findByEmail.mockResolvedValue(undefined);
      });

      it('throws error', () => {
        expect(authService.login({ email, password })).rejects
          .toThrow(new Error('User not exist'));
      });
    });

    context('with incorrect password', () => {
      beforeEach(async () => {
        userRepository.findByEmail.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(false);
      });

      it('returns a userInfo ', () => {
        expect(authService.login({ email, password })).rejects
          .toThrow(new Error('User not exist'));
      });
    });
  });

  describe('isEmailFormat', () => {
    context('with email format', () => {
      it('returns true', () => {
        expect(authService.isEmailFormat('tester@example.com')).toBe(true);
      });
    });

    context('with wrong email format', () => {
      it('returns false', () => {
        expect(authService.isEmailFormat('WRONG_FORMAT')).toBe(false);
      });
    });
  });

  describe('signup', () => {
    context('with valid user', () => {
      beforeEach(() => {
        userRepository.findByEmail.mockResolvedValue(undefined);
        userRepository.findByNickname.mockResolvedValue(undefined);
        bcrypt.hash.mockResolvedValue(user.password);
      });

      it('creates user', async () => {
        const errors = await authService.signup({ email, password, nickname });
        expect(userRepository.create)
          .toBeCalledWith({ email, password, nickname });
        expect(errors).toBeFalsy();
      });
    });

    context('with existing email', () => {
      beforeEach(() => {
        userRepository.findByEmail.mockResolvedValue(user);
      });

      it('이메일이 중복일경우 이메일이 중복이라는 에러를 전달한다.', async () => {
        const errors = await authService.signup({ email, password, nickname });
        expect(errors).toEqual(['Email already exists']);
      });
    });

    context('with existing nickname', () => {
      beforeEach(() => {
        userRepository.findByEmail.mockResolvedValue(undefined);
        userRepository.findByNickname.mockResolvedValue(user);
      });

      it('닉네임이 중복일경우 닉네임이 중복이라는 에러를 전달한다.', async () => {
        const errors = await authService.signup({ email, password, nickname });
        expect(errors).toEqual(['nickname already exists']);
      });
    });

    context('with existing email, nickname', () => {
      beforeEach(() => {
        userRepository.findByEmail.mockResolvedValue(user);
        userRepository.findByNickname.mockResolvedValue(user);
      });

      it('닉네임, 이메일이 중복일경우 에러 두개를 전달한다.', async () => {
        const errors = await authService.signup({ email, password, nickname });
        expect(errors).toEqual(['Email already exists', 'nickname already exists']);
      });
    });
  });
});
