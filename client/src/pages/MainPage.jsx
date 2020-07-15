import React from 'react';

import { useSelector } from 'react-redux';

import LoginPage from './LoginPage';
import MatchingPage from './MatchingPage';

export default function MainPage() {
  const { isLogin } = useSelector((state) => state);

  return (
    <>
      {isLogin
        ? <MatchingPage />
        : <LoginPage />}
    </>
  );
}
