import jwtTokenService from './jwtToken.service';
import userRepository from '../repository/user.repository';
import userService from './user.service';

jest.mock('../repository/user.repository');
jest.mock('./jwtToken.service');

describe('userService', () => {
  const token = 'abcd';

  const user = {
    email: 'tester@exapmle.com',
    password: '1234',
    nickname: 'nickname',
    userURL: 'http://test.com',
  };

  beforeEach(() => {
    userRepository.findByEmail.mockResolvedValue(user);
    jwtTokenService.createToken.mockReturnValue(token);
  });

  describe('getUserInfo', () => {
    context('with given existing token', () => {
      it('return a userInfo', async () => {
        const userInfo = await userService.getUserInfo(token);

        expect(userInfo).toBe(user);
      });
    });
  });

  describe('getUserImageURL', () => {
    beforeEach(() => {
      userRepository.getUserImage.mockResolvedValue(user.userURL);
    });

    it('changes to the given image', async () => {
      const url = await userService.getUserImageURL(user.email);

      expect(url).toBe(user.userURL);
    });
  });
});
