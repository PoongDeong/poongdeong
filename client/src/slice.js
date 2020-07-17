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
    timeOption: '',
    categoryOption: '',
    isMatchingButtonClicked: false,
    matchingTimer: 1,
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
    setTimeOption(state, { payload: timeOption }) {
      return { ...state, timeOption };
    },
    setCategoryOption(state, { payload: categoryOption }) {
      return { ...state, categoryOption };
    },
    setIsMatchingButtonClicked(state) {
      return { ...state, isMatchingButtonClicked: !state.isMatchingButtonClicked };
    },
    setMatchingTimer(state, { payload: matchingTimer }) {
      return { ...state, matchingTimer };
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
  setTimeOption,
  setCategoryOption,
  setIsMatchingButtonClicked,
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
