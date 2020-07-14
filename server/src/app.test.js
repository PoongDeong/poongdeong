import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from './app';

describe('app', () => {
  context('with path /', () => {
    it('responses hello world', async () => {
      const { body, status } = await request(app).get('/');

      expect(status).toBe(200);
      expect(body.message).toBe('Hello world!');
    });
  });
});
