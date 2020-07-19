import request from 'supertest';

import app from '../app';

import db from '../database';

import createTable from '../hooks/create-table';
import createUser from '../hooks/create-user';

import userService from '../services/user.service';

jest.mock('../services/user.service');

describe('/user', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlckBleGFtcGxlLmNvbSIsImlhdCI6MTU5NTEyMTUxOCwic3ViIjoidXNlckluZm8ifQ.QXgRVWZc362X5kMYYQauvxk7wavfpQqOSDIaqtrlUZ4';
  const user = {
    email: 'tester@example.com',
    password: '1234',
    nickname: 'nickname',
    userURL: 'http://test.com',
  };

  beforeEach(async () => {
    await db.schema.dropTableIfExists('users');
    await createTable();
    await createUser();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('POST /info', () => {
    context('with token for getInfo', () => {
      beforeEach(() => {
        userService.getInfo.mockResolvedValue(user);
      });

      it('return status code of 200 and userInfo', async () => {
        const { status, body } = await request(app)
          .post('/user/info')
          .send({ token });

        const { userInfo } = body;

        expect(userInfo).toEqual(user);
        expect(status).toBe(200);
      });
    });

    context('with unexisting token', () => {
      beforeEach(() => {
       userService.getInfo.mockRejectedValue(new Error('User not exist'));
      });

      it('return status code of 401 and error', async () => {
        const { status } = await request(app)
          .post('/user/info')
          .send({ token });

        expect(status).toBe(500);
      });
    });
  });

  describe('GET /userImage/:token', () => {
    beforeEach(() => {
      userService.getUserImageURL.mockResolvedValue(user.userURL);
    });
    context('with right image and token', () => {
      it('edits Image and returns status code of 200 and a message of done', async () => {
        const { statusCode, body } = await request(app)
          .get(`/user/userImage/${token}`)
          .query({ token });

        const { userURL } = body;

        expect(statusCode).toBe(200);
        expect(userURL).toBe(user.userURL);
      });
    });

    context('when internal error from server', () => {
      beforeEach(() => {
        userService.getUserImageURL.mockRejectedValue(new Error('internal error'));
      });

      it('returns status code of 500 and message of Internal server error', async () => {
        const { body, statusCode } = await request(app)
          .get(`/user/userImage/${token}`)
          .query({ token });

        expect(statusCode).toBe(500);
        expect(body.message).toBe('Internal server error');
      });
    });

    context('when no query is sent', () => {
      it('returns status code of 422', async () => {
        const { statusCode } = await request(app)
          .get(`/user/userImage/${token}`);

        expect(statusCode).toBe(422);
      });
    });
  });
});
