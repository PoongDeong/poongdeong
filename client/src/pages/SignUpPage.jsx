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
    padding: '10px 25px',
    margin: '5px -10px 5px -10px',
    fontSize: '15px',
  },
  form: {
    display: 'flex',
    marginTop: '100px',
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
    margin: '6px -10px 5px -10px',
    width: '253px',
    '&:disabled': {
      backgroundColor: 'gray',
    },
  },
};

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const [isSubmitable, setIsSubmitable] = useState('disabled');
  const history = useHistory();
  const dispatch = useDispatch();

  const { signUpFields } = useSelector((state) => state);

  const {
    password, passwordCheck, id, nickname,
  } = signUpFields;

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

    if (id && nickname && password && password === passwordCheck) {
      setIsSubmitable('');
    }
  }, [password, passwordCheck, id, nickname]);

  return (
    <form onSubmit={handleSubmit} css={styles.form}>
      <h3>
        풍덩 이용을 위해
        <br />
        회원가입을 진행합니다
      </h3>
      <input
        onChange={(e) => dispatch(setSignUpId(e.target.value))}
        defaultValue=""
        placeholder="poongdeong@example.com"
        css={styles.input}
      />
      <input
        onChange={(e) => dispatch(setSignUpNickName(e.target.value))}
        defaultValue=""
        placeholder="닉네임"
        css={styles.input}
      />
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
      <button
        css={styles.button}
        type="submit"
        disabled={isSubmitable}
      >
        가입
      </button>
    </form>
  );
}
