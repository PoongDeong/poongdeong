import axios from 'axios';

import { postSignUp } from "./auth";

jest.mock('axios');

describe('auth', () => {
  describe('postSignUp', () =>{
    beforeEach(() =>{
      axios.post.mockResolvedValue({data: {token: '9999'}})
    });

    it('responses token', async () => {
      const id = "test@example.com";
      const nickname = "tester";
      const password = '1234';
      const token = await postSignUp({ id, nickname, password });

      expect(token).toBe('9999');
    });
  });
});
