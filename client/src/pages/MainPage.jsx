import React from 'react';

import { useSelector } from "react-redux";

import LoginPage from './LoginPage';
import MatchingPage from './MatchingPage';

export default function MainPage() {
  const state = useSelector((state) => state);

  return (
    <>
      {state.isLogin
      ? <MatchingPage />
      : <LoginPage />}
    </>
  )
}
