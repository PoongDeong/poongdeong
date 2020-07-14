import reducer from './slice';
import { setIsLogin } from "./slice";

describe('reducer', () =>{
  describe('setIsLogin', () =>{
    it('changes isLogin', () =>{
      const state = reducer(undefined, setIsLogin(true));

      expect(state.isLogin).toBe(true);
    })
  })
});
