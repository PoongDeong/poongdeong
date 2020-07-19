import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { postLogin } from '../apis/auth';

import LoginErrorMessage from '../components/LoginErrorMessage';

import { toggleLoginState } from '../slice';

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    maxWidth: '200px',
    width: '60%',
    height: '60%',
    margin: '60px 0px',
  },
  input: {
    background: '#fafafa',
    border: '1px solid #dbdbdb',
    padding: '10px 35px',
    margin: '5px -10px 5px -10px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    borderRadius: '4px',
    backgroundColor: 'cornflowerblue',
    color: 'white',
    border: '1px solid #dbdbdb',
    padding: '7px 0px',
    margin: '6px -10px 0px -10px',
    width: '109%',
  },
  font: {
    color: 'rgba(var(--f52, 153, 153, 153), 1)',
    paddingBottom: '4px',
  },
};

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenState, setTokenState] = useState('');
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(('token'))) {
      dispatch(toggleLoginState());
    }
  }, [tokenState]);

  const handleUserEmail = (inputEmail) => setEmail(inputEmail);
  const handleUserPassword = (inputPassword) => setPassword(inputPassword);
  const goToSignUpPage = () => history.push('/signup');

  const submitUserInfo = async () => {
    try {
      const token = await postLogin({ email, password });
      await setTokenState(token);
      await localStorage.setItem('token', token);
    } catch (e) {
      setIsErrorMessage(true);
    }
  };

  return (
    <div css={styles.page}>
      <img css={styles.logo} src="https://resource.poongdeong.com/logo.png" alt="Logo" />
      <form
        css={styles.form}
      >
        <input
          onChange={(e) => handleUserEmail(e.target.value)}
          value={email}
          css={styles.input}
          placeholder="example@test.com"
        />
        <input
          onChange={(e) => handleUserPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="password"
          css={styles.input}
        />
        {isErrorMessage && <LoginErrorMessage />}
        <button
          onClick={submitUserInfo}
          type="button"
          css={styles.button}
        >
          로그인
        </button>
        <button
          onClick={goToSignUpPage}
          type="button"
          css={styles.button}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
