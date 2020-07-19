import { createSlice } from '@reduxjs/toolkit';

import Swal from 'sweetalert2';

import { postSignUp } from './apis/auth';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    signUpFields: {
      email: '',
      password: '',
      passwordCheck: '',
      nickname: '',
    },
    loginFields: {
      email: '',
      password: '',
    },
    token: '',
    loginState: !!localStorage.getItem('token'),
    timeOption: '',
    categoryOption: '',
    matchingButtonState: false,
    matchingWaitingTimer: 1,
<<<<<<< HEAD
    stream: '',
    callerSignal: '',
    callAccepted: false,
    savedRoomName: '',
=======
    userFields: {
      profileImage: '../src/images/default-image.jpeg',
      userEmail: '',
      userNickName: '',
    },
>>>>>>> Add profile image uploader
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
    setSignUpEmail(state, { payload: email }) {
      return { ...state, signUpFields: { ...state.signUpFields, email } };
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
    toggleMatchingButton(state, { payload: matchingButtonState }) {
      return { ...state, matchingButtonState };
    },
    setMatchingWaitingTimer(state, { payload: matchingWaitingTimer }) {
      return { ...state, matchingWaitingTimer };
    },
    setStream(state, { payload: stream }) {
      return { ...state, stream };
    },
    setCallerSignal(state, { payload: callerSignal }) {
      return { ...state, callerSignal };
    },
    setCallAccepted(state, { payload: callAccepted }) {
      return { ...state, callAccepted };
    },
    setSavedRoomName(state, { payload: savedRoomName }) {
      return { ...state, savedRoomName };
    },
    setProfileImage(state, { payload: profileImage }) {
      return { ...state, userFields: { ...state.userFields, profileImage } };
    },
    setUserEmail(state, { payload: userEmail }) {
      return { ...state, userFields: { ...state.userFields, userEmail } };
    },
    setUserNickName(state, { payload: userNickName }) {
      return { ...state, userFields: { ...state.userFields, userNickName } };
    },
  },
});

export const {
  toggleLoginState,
  setToken,
  setSignUpEmail,
  setSignUpPassword,
  setSignUpPasswordCheck,
  setSignUpNickName,
  setTimeOption,
  setCategoryOption,
  toggleMatchingButton,
  setMatchingWaitingTimer,
<<<<<<< HEAD
  setStream,
  setCallerSignal,
  setCallAccepted,
  setSavedRoomName,
=======
  setProfileImage,
  setUserEmail,
  setUserNickName,
>>>>>>> Add profile image uploader
} = actions;

const first = (arr) => arr[0];

const alertError = async (e) => {
  const errorReasons = {
    email: '이메일이 올바르지 않습니다.',
    'Email already exists': '중복되는 이메일입니다.',
    'nickname already exists': '중복되는 닉네임입니다.',
  };

  const { errors } = e.response.data;
  const error = first(errors).param || first(errors);

  await Swal.fire({ icon: 'error', text: errorReasons[error] });
};

export function requestSignUp(history) {
  return async (dispatch, getState) => {
    const { signUpFields } = getState();

    try {
      await postSignUp(signUpFields);
      history.push('/');
    } catch (e) {
      await alertError(e);
    }
  };
}

export default reducer;
