import app from '../app';
import JWTtoken from '../services/jwtToken.service';

const request = require('supertest');

describe('/auth', () => {
  describe('POST /login', () => {
    context('with existing email and right password', () => {
      const email = 'gibong@gmail.com';
      const password = '1234';
      it('returns status code of 200 and true', async () => {
        const tokenTest = await JWTtoken.createToken({ email }); // test 용 token 만듬..... 여기서 만들어도 되나//?ㄴ
        const { body, statusCode } = await request(app)
          .post('/auth/login')
          .send({ userInfo: { email, password } });

        expect(body.token).toBe(tokenTest);
        expect(statusCode).toBe(200);
      });
    });

    context('with unexisting email', () => {
      const email = 'UNEXISTING_EMAIL';
      const password = 'ANY_PASSWORD';
      it('returns status code of 401 and error', async () => {
        // const tokenTest = await JWTtoken.createToken({ email }); // test 용 token 만듬..... 여기서 만들어도 되나//?ㄴ
        const { body, statusCode } = await request(app)
          .post('/auth/login')
          .send({ userInfo: { email, password } });

        expect(statusCode).toBe(401);
      });
    });
  });
});
