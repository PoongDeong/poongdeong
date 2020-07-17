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
    loginState: true,
    timeOption: '',
    categoryOption: '',
    matchingButtonState: false,
    matchingTimer: 1,
  },
  reducers: {
    toggleLoginState(state) {
      return {
        ...state,
        loginState: !state.loginState,
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
    setTimeOption(state, { payload: timeOption }) {
      return { ...state, timeOption };
    },
    setCategoryOption(state, { payload: categoryOption }) {
      return { ...state, categoryOption };
    },
    toggleMatchingButton(state) {
      return { ...state, matchingButtonState: !state.matchingButtonState };
    },
    setMatchingTimer(state, { payload: matchingTimer }) {
      return { ...state, matchingTimer };
    },
  },
});

export const {
  toggleLoginState,
  setToken,
  setSignUpId,
  setSignUpPassword,
  setSignUpPasswordCheck,
  setSignUpNickName,
  setTimeOption,
  setCategoryOption,
  toggleMatchingButton,
  setMatchingTimer,
} = actions;

export function requestSignUp(history) {
  return async (dispatch, getState) => {
    const { signUpFields } = getState();

    const token = await postSignUp(signUpFields);

    dispatch(setToken(token));

    history.push('/');
  };
}

export default reducer;
