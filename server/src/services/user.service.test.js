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
    jwtTokenService.createToken.mockResolvedValue(token);
    jwtTokenService.verifyToken.mockResolvedValue(1);
    userRepository.findById.mockResolvedValue(info);
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
