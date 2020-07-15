import React from 'react';
import {useHistory} from 'react-router-dom';

import {useDispatch, useSelector} from "react-redux";

import {requestSignUp, setSignUpId, setSignUpNickName, setSignUpPassword, setSignUpPasswordCheck} from "../slice";

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

  const { signUpFields } = useSelector(state => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestSignUp(history));
  };

  return (
    <form onSubmit={handleSubmit} css={styles.form}>
      <input
        onChange={e => dispatch(setSignUpId(e.target.value))}
        defaultValue=""
        placeholder="poongdeong@example.com"
        css={styles.input}
      />
      <button>중복확인</button>
      <input
        onChange={e => dispatch(setSignUpNickName(e.target.value))}
        defaultValue=""
        placeholder="닉네임"
        css={styles.input}
      />
      <button>중복확인</button>
      <input
        onChange={e => dispatch(setSignUpPassword(e.target.value))}
        type="password"
        defaultValue=""
        placeholder="비밀번호"
        css={styles.input}
      />
      <input
        onChange={e => dispatch(setSignUpPasswordCheck(e.target.value))}
        type="password"
        defaultValue=""
        placeholder="비밀번호 확인"
        css={styles.input}
      />
      <div>
        {!signUpFields.password && !signUpFields.passwordCheck
          ? ''
          : signUpFields.password === signUpFields.passwordCheck
            ? '비밀번호가 일치합니다'
            : '비밀번호가 일치하지 않습니다'
        }
      </div>
      <button css={styles.button} type="submit" disabled="">
        가입
      </button>
    </form>
  );
}
