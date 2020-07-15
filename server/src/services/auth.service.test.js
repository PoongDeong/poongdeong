import authService from './auth.service';

import jwtTokenService from './jwtToken.service';

import userRepository from '../repository/user.repository';

jest.mock('../repository/user.repository');
jest.mock('./jwtToken.service');

describe('auth', () => {
  const email = 'gibong@gmail.com';
  const password = '1234';
  const nickname = 'NICK_NAME';

  const token = 'abcd';

  beforeEach(() => {
    jwtTokenService.createToken.mockClear();
    userRepository.create.mockClear();
  });

  beforeEach(() => {
    jwtTokenService.createToken.mockReturnValue(token);
  });

  describe('login', () => {
    beforeEach(async () => {
      userRepository.checkPassword.mockResolvedValue(true);
    });

    context('with given existing id and right password', () => {
      it('returns a userInfo ', async () => {
        const userInfo = await authService.login({ email, password });
        expect(userInfo).toBe(token);
      });
    });

    context('with given existing id and wrong password', () => {
      beforeEach(async () => {
        userRepository.checkPassword.mockResolvedValue(false);
      });

      it('returns a userInfo ', () => {
        expect(authService.login({ email, password })).rejects.toThrow(new Error('login failed'));
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
      it('creates user ', async () => {
        await authService.signup({ email, password, nickname });
        expect(userRepository.create).toBeCalledWith({ email, password, nickname });
      });
    });

    context('with invalid user', () => {
      beforeEach(() => {
        userRepository.create.mockRejectedValue(new Error('Already existing email'));
      });

      it('throws error', async () => {
        try {
          await authService.signup({ email, password, nickname });
        } catch (err) {
          expect(err).toEqual(new Error('Already existing email'));
        }
      });
    });

    context('with invalid email format', () => {
      it('throws error', async () => {
        try {
          await authService.signup({ email: 'WRONG_EMAIL_FORMAT', password, nickname });
        } catch (err) {
          expect(err).toEqual(new Error('Invalid email format'));
        }
      });
    });

    context('with existing email', () => {
      beforeEach(() => {
        userRepository.checkAvailability.mockReturnValue(false);
      });

      it('throws error', async () => {
        try {
          await authService.signup({ email, password, nickname });
        } catch (err) {
          expect(err).toEqual(new Error('Email already exists'));
        }
      });
    });

    context('with unavailable nickname', () => {
      beforeEach(() => {
        userRepository.checkAvailability.mockReturnValue(true);
        userRepository.checkNicknameAvailability.mockReturnValue(false);
      });

      it('throws error', async () => {
        try {
          await authService.signup({ email, password, nickname });
        } catch (err) {
          expect(err).toEqual(new Error('Nickname already exists'));
        }
      });
    });
  });
});
