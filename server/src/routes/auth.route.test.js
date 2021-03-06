import request from 'supertest';

import app from '../app';

import auth from '../services/auth.service';

jest.mock('../services/auth.service');

describe('/auth', () => {
  const email = 'gibong@gmail.com';
  const password = '1234';
  const nickname = 'gibong';

  const token = 'token';

  describe('POST /login', () => {
    context('with existing email and right password', () => {
      beforeEach(() => {
        auth.login.mockResolvedValue(token);
      });

      it('returns status code of 200 and true', async () => {
        const { status, body } = await request(app)
          .post('/auth/login')
          .send({ email, password });

        expect(status).toBe(200);
        expect(body.token).toBe(token);
      });
    });

    context('with unexisting email', () => {
      beforeEach(() => {
        auth.login.mockRejectedValue(new Error('User not exist'));
      });

      it('returns status code of 401 and error', async () => {
        const { status } = await request(app)
          .post('/auth/login')
          .send({ email, password });

        expect(status).toBe(400);
      });
    });

    context('when occurs undefined error', () => {
      beforeEach(() => {
        auth.login.mockRejectedValue(new Error());
      });

      it('resposnes 500 error', async () => {
        const { status } = await request(app)
          .post('/auth/login')
          .send({ email, password });

        expect(status).toBe(500);
      });
    });

    context('without all inputs', () => {
      it('resposnes 404 error', async () => {
        const { status, body } = await request(app)
          .post('/auth/login')
          .send({ password });

        const { errors } = body;
        const { msg, param, location } = errors[0];

        expect(status).toBe(422);
        expect(msg).toBe('Invalid value');
        expect(param).toBe('email');
        expect(location).toBe('body');
      });
    });
  });

  describe('POST /signup', () => {
    it('responses created', async () => {
      const { status, body } = await request(app)
        .post('/auth/signup')
        .send({
          email,
          password,
          nickname,
        });

      expect(status).toBe(201);
      expect(body).toEqual({});
    });

    context('with existing email', () => {
      beforeEach(() => {
        auth.signup.mockResolvedValue(['Email already exists']);
      });

      it('resposnes errors', async () => {
        const { status, body } = await request(app)
          .post('/auth/signup')
          .send({
            email,
            password,
            nickname,
          });

        expect(body.errors).toEqual(['Email already exists']);
        expect(status).toBe(400);
      });
    });

    context('when occurs undefined error', () => {
      beforeEach(() => {
        auth.signup.mockRejectedValue();
      });

      it('resposnes 500 error', async () => {
        const { status } = await request(app)
          .post('/auth/signup')
          .send({
            email,
            password,
            nickname,
          });

        expect(status).toBe(500);
      });
    });

    context('without all inputs', () => {
      it('resposnes 404 error', async () => {
        const { status, body } = await request(app)
          .post('/auth/signup')
          .send({ password });

        const { errors } = body;
        const { msg, param, location } = errors[0];

        expect(status).toBe(422);
        expect(msg).toBe('Invalid value');
        expect(param).toBe('email');
        expect(location).toBe('body');
      });
    });
  });
});
