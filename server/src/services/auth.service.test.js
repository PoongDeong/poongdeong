import authService from './auth.service';
import jwtTokenService from './jwtToken.service';

describe('auth', () => {
  let token;
  beforeEach(async () => {
    token = await jwtTokenService.createToken({ email: 'gibong@gmail.com' });
  });

  describe('login', () => {
    context('with given existing id and right password', () => {
      const email = 'gibong@gmail.com';
      const password = '1234';
      it('returns a userInfo ', async () => {
        const userInfo = await authService.login({ email, password });
        expect(userInfo).toBe(token);
      });
    });

    context('with given existing id and wrong password', () => {
      const email = 'gibong@gmail.com';
      const password = 'WRONG_PASSWORD';
      it('returns a userInfo ', () => {
        expect(authService.login({ email, password })).rejects.toThrow(new Error('login failed'));
      });
    });

    context('with given existing id and wrong password', () => {
      const email = 'UNEXISTING_ID';
      const password = 'ANY_PASSWORD';
      it('returns a userInfo', () => {
        expect(authService.login({ email, password })).rejects.toThrow(new Error('login failed'));
      });
    });
  });
});
