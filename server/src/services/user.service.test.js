import userService from './user.service';

import jwtTokenService from './jwtToken.service';

import userRepository from '../repository/user.repository';

jest.mock('../repository/user.repository');
jest.mock('./jwtToken.service');

describe('user', () => {
  const token = 'abcd';

  const info = {
    email: 'gibong@gmail.com',
    password: '1234',
    nickname: 'gibong',
  };

  beforeEach(() => {
    userRepository.findByEmail.mockResolvedValue(info);
    jwtTokenService.createToken.mockReturnValue(token);
  });
  describe('getUserinfo', () => {
    context('with given existing token', () => {
      it('return a userInfo', async () => {
        const userInfo = await userService.getUserInfo(token);

        expect(userInfo).toBe(info);
      });
    });
  });
});
