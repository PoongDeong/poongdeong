import React from 'react';

import {useDispatch, useSelector} from "react-redux";

import Login from './Login';
import MatchingPage from './MatchingPage';

export default function MainPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  return (
    <>
      {state.isLogin
      ? <MatchingPage />
      : <Login />}
    </>
  )
}
