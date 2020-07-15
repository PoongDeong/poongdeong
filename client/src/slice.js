import { createSlice } from '@reduxjs/toolkit';
import {postSignUp} from "./apis/auth";

export function requestSignUp(history) {
  return async (dispatch, getState) => {
    const { signUpFields } = getState();
    const token = await postSignUp(signUpFields);

    dispatch(setToken(token));

    history.push('/');
  }
}

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    signUpFields: {
      id: '',
      password: '',
      nickname: '',
    },
    token: '',
    isLogin: false,
  },
  reducers: {
    setIsLogin(state, {payload: isLogin}) {
      return {
        ...state,
        isLogin: true,
      }
    },
    setToken(state, {payload: token}) {
      return {...state, token};
    }
  },
});

export const {
  setIsLogin,
  setToken,
} = actions;

export default reducer;
