import reducer from './slice';
import { setIsLogin, setToken } from "./slice";

describe('reducer', () =>{
  describe('setIsLogin', () =>{
    it('changes isLogin', () =>{
      const state = reducer(undefined, setIsLogin());

      expect(state.isLogin).toBe(true);
    })
  });

  describe('setToken', () => {
    const token = '1234';

    it('changes token', () => {
      const state = reducer(undefined, setToken(token))

      expect(state.token).toBe(token);
    })
  });
});
