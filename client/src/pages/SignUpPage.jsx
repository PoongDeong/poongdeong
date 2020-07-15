import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {
  requestSignUp, setSignUpId, setSignUpNickName, setSignUpPassword, setSignUpPasswordCheck,
} from '../slice';

const styles = {
  input: {
    background: '#fafafa',
    border: '1px solid #dbdbdb',
    padding: '7px 35px',
    margin: '0px -10px 5px -10px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const { signUpFields } = useSelector((state) => state);

  const { password, passwordCheck } = signUpFields;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestSignUp(history));
  };

  useEffect(() => {
    if (!password && !passwordCheck) {
      setError(null);
      return;
    }

    const message = password === passwordCheck
      ? '비밀번호가 일치합니다'
      : '비밀번호가 일치하지 않습니다';

    setError({ message });
  }, [password, passwordCheck]);

  return (
    <form onSubmit={handleSubmit} css={styles.form}>
      <input
        onChange={(e) => dispatch(setSignUpId(e.target.value))}
        defaultValue=""
        placeholder="poongdeong@example.com"
        css={styles.input}
      />
      <button type="button">중복확인</button>
      <input
        onChange={(e) => dispatch(setSignUpNickName(e.target.value))}
        defaultValue=""
        placeholder="닉네임"
        css={styles.input}
      />
      <button type="button">중복확인</button>
      <input
        onChange={(e) => dispatch(setSignUpPassword(e.target.value))}
        type="password"
        defaultValue=""
        placeholder="비밀번호"
        css={styles.input}
      />
      <input
        onChange={(e) => dispatch(setSignUpPasswordCheck(e.target.value))}
        type="password"
        defaultValue=""
        placeholder="비밀번호 확인"
        css={styles.input}
      />
      <div>
        {error && error.message}
      </div>
      <button css={styles.button} type="submit" disabled="">
        가입
      </button>
    </form>
  );
}
