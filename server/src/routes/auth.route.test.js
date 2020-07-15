import request from 'supertest';

import app from '../app';

import auth from '../services/auth.service';

jest.mock('../services/auth.service');

describe('/auth', () => {
  const email = 'gibong@gmail.com';
  const password = '1234';

  const token = 'token';

  describe('POST /login', () => {
    context('with existing email and right password', () => {
      beforeEach(() => {
        auth.login.mockResolvedValue(token);
      });

      it('returns status code of 200 and true', async () => {
        const { status, body } = await request(app)
          .post('/auth/login')
          .send({ userInfo: { email, password } });

        expect(status).toBe(200);
        expect(body.token).toBe(token);
      });
    });

    context('with unexisting email', () => {
      beforeEach(() => {
        auth.login.mockRejectedValue(new Error('login failed'));
      });

      it('returns status code of 401 and error', async () => {
        const { status } = await request(app)
          .post('/auth/login')
          .send({ userInfo: { email, password } });

        expect(status).toBe(400);
      });
    });
  });
});
