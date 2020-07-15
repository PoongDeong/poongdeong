import reducer, {setIsMenuOn, setSignUpNickName, setSignUpPassword, setSignUpPasswordCheck} from './slice';
import { setIsLogin, setToken, setSignUpId } from "./slice";
import {useSelector} from "react-redux";

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

  describe('setSignUpId', () => {
    const id = 'test@test.com';

    it('changes id state', () => {
      const state = reducer(undefined, setSignUpId(id))

      expect(state.signUpFields.id).toBe(id);
    });
  });

  describe('setSignUpNickName', () => {
    const nickname = 'test123';

    it('changes nickname state', () => {
      const state = reducer(undefined, setSignUpNickName(nickname))

      expect(state.signUpFields.nickname).toBe(nickname);
    });
  });

  describe('setSignUpPassword', () => {
    const password = '1234';

    it('changes password state', () => {
      const state = reducer(undefined, setSignUpPassword(password))

      expect(state.signUpFields.password).toBe(password);
    });
  });

  describe('setSignUpPasswordCheck', () => {
    const passwordCheck = '1234';

    it('changes passwordCheck state', () => {
      const state = reducer(undefined, setSignUpPasswordCheck(passwordCheck))

      expect(state.signUpFields.passwordCheck).toBe(passwordCheck);
    });
  });

  describe('setIsMenuOn', () => {
    const beforeState = useSelector(state => state.isMenuOn);

    it('changes menu state', () => {
      expect(reducer(undefined, setIsMenuOn()).isMenuOn).toBe(!beforeState);
    });
  });
});
