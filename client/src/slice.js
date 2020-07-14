import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    isLogin: true,
  },
  reducers: {
    setIsLogin(state, {payload: isLogin}) {
      return {
        ...state,
        isLogin,
      }
    }
  },
});

export const {
  setIsLogin,
} = actions;

export default reducer;
