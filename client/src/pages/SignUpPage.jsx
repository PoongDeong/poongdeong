import React from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch} from "react-redux";

import { requestSignUp } from "../slice";

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
}

export default function SignUpPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestSignUp(history));
  };

  return (
    <form onSubmit={handleSubmit} css={styles.form}>
      <input
        defaultValue=""
        placeholder="poongdeong@example.com"
        css={styles.input}
      />
      <input
        defaultValue=""
        placeholder="닉네임"
        css={styles.input}
      />
      <input
        type="password"
        defaultValue=""
        placeholder="비밀번호"
        css={styles.input}
      />
      <input
        type="password"
        defaultValue=""
        placeholder="비밀번호 확인"
        css={styles.input}
      />

      <button css={styles.button} type="submit" >
        가입
      </button>
    </form>
  );
}
