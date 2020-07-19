import request from 'supertest';

import app from '../app';

import user from '../services/user.service';

jest.mock('../services/user.service');

describe('/user', () => {
  const token = 'token';
  const info = {
    email: 'gibong@gmail.com',
    nickname: 'gibong',
  };
  describe('POST /info', () => {
    context('with token for getInfo', () => {
      beforeEach(() => {
        user.getInfo.mockResolvedValue(info);
      });

      it('return status code of 200 and userInfo', async () => {
        const { status, body } = await request(app)
          .post('/user/info')
          .send({ token });

        const { userInfo } = body;

        expect(info).toEqual(userInfo);
        expect(status).toBe(200);
      });
    });

    context('with unexisting token', () => {
      beforeEach(() => {
        user.getInfo.mockRejectedValue(new Error('User not exist'));
      });

      it('return status code of 401 and error', async () => {
        const { status } = await request(app)
          .post('/user/info')
          .send({ token });

        expect(status).toBe(500);
      });
    });
  });
});
