import axios from 'axios';

import { postLogin, postSignUp } from './auth';

jest.mock('axios');

describe('auth', () => {
  describe('postSignUp', () => {
    beforeEach(() => {
      axios.post.mockResolvedValue({ data: { token: '9999' } });
    });

    it('responses token', async () => {
      const id = 'test@example.com';
      const nickname = 'tester';
      const password = '1234';

      const token = await postSignUp({ id, nickname, password });

      expect(token).toBe('9999');
    });
  });

  describe('postLogin', () => {
    describe('with inexistent id', () => {
      beforeEach(() => {
        axios.post.mockResolvedValue({ data: { token: '' } });
      });

      it('responses token', async () => {
        const id = 'inexistent@example.com';
        const password = '1234';

        const token = await postLogin({ id, password });

        expect(token).toBe('');
      });
    });

    describe('with correct password', () => {
      beforeEach(() => {
        axios.post.mockResolvedValue({ data: { token: '9999' } });
      });

      it('responses token', async () => {
        const id = 'test@example.com';
        const password = '1234';

        const token = await postLogin({ id, password });

        expect(token).toBe('9999');
      });
    });

    describe('with incorrect password', () => {
      beforeEach(() => {
        axios.post.mockResolvedValue({ data: { token: '' } });
      });

      it('responses token', async () => {
        const id = 'test@example.com';
        const password = '0000';

        const token = await postLogin({ id, password });

        expect(token).toBe('');
      });
    });
  });
});
