import axios from 'axios';

import { postLogin, postSignUp } from './auth';

jest.mock('axios');

describe('auth', () => {
  const email = 'test@example.com';
  const nickname = 'tester';
  const password = '1234';

  const TOKEN = '9999';

  describe('postSignUp', () => {
    beforeEach(() => {
      axios.post.mockResolvedValue({ data: { } });
    });

    it('responses token', async () => {
      const token = await postSignUp({ email, nickname, password });

      expect(token).toEqual({});
    });
  });

  describe('postLogin', () => {
    describe('with existent email and correct password', () => {
      beforeEach(() => {
        axios.post.mockResolvedValue({ data: { token: TOKEN } });
      });

      it('responses token', async () => {
        const token = await postLogin({ email, password });

        expect(token).toBe(TOKEN);
      });
    });

    describe('with wrong email or wrong password', () => {
      beforeEach(() => {
        axios.post.mockResolvedValue({ data: { token: '' } });
      });

      it('responses empty token', async () => {
        const token = await postLogin({ email, password });

        expect(token).toBeFalsy();
      });
    });
  });
});
