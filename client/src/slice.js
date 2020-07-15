import { createSlice } from '@reduxjs/toolkit';
import { postSignUp } from './apis/auth';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    signUpFields: {
      id: '',
      password: '',
      passwordCheck: '',
      nickname: '',
    },
    token: '',
    isLogin: true,
    isMenuOn: false,
  },
  reducers: {
    setIsLogin(state) {
      return {
        ...state,
        isLogin: !state.isLogin,
      };
    },
    setToken(state, { payload: token }) {
      return { ...state, token };
    },
    setSignUpId(state, { payload: id }) {
      return { ...state, signUpFields: { ...state.signUpFields, id } };
    },
    setSignUpPassword(state, { payload: password }) {
      return { ...state, signUpFields: { ...state.signUpFields, password } };
    },
    setSignUpPasswordCheck(state, { payload: passwordCheck }) {
      return { ...state, signUpFields: { ...state.signUpFields, passwordCheck } };
    },
    setSignUpNickName(state, { payload: nickname }) {
      return { ...state, signUpFields: { ...state.signUpFields, nickname } };
    },
    setIsMenuOn(state) {
      return { ...state, isMenuOn: !state.isMenuOn };
    },
  },
});

export const {
  setIsLogin,
  setToken,
  setSignUpId,
  setSignUpPassword,
  setSignUpPasswordCheck,
  setSignUpNickName,
  setIsMenuOn,
} = actions;

export function requestSignUp(history) {
  return async (dispatch, getState) => {
    const { signUpFields } = getState();
    console.log('signUpFields', signUpFields);

    const token = await postSignUp(signUpFields);

    dispatch(setToken(token));

    history.push('/');
  };
}

export default reducer;
