import authService from './auth.service';
import jwtTokenService from './jwtToken.service';

describe('auth', () => {
  beforeEach(() => {
  });

  describe('login', () => {
    context('with given existing id and right password', () => {
      const email = 'gibong@gmail.com';
      const password = '1234';
      it('returns a userInfo ', async () => {
        const token = await jwtTokenService.createToken({ email }); // id 나 email 로 통일 그리고 이걸 여기다 넣어도 되나?? 테스트 용 초기값인데 asyc 때문에 이 안에 넣음.
        const userInfo = await authService.login({ email, password });
        expect(userInfo).toBe(token);
      });
    });

    context('with given existing id and wrong password', () => {
      const email = 'gibong@gmail.com';
      const password = 'WRONG_PASSWORD';
      it('returns a userInfo ', async () => {
        expect(await authService.login({ email, password })).toBe(Error);
      });
    });

    context('with given existing id and wrong password', () => {
      const email = 'UNEXISTING_ID';
      const password = 'ANY_PASSWORD';
      it('returns a userInfo ', async () => {
        expect(await authService.login({ email, password })).toBe(Error);
      });
    });
  });
});
